import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { In, Like, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { convertToTree } from 'src/utils/convertToTree';
import { GetInfoVo } from './vo/get-info.vo';
import { filterPermissions } from 'src/utils/filterPermissions';
import { CacheService } from 'src/cache/cache.service';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { rolesToMenus } from 'src/utils/rolesToMenus';
import { FindMenuListDto } from './dto/findMenu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import fileConfig from 'src/config/file';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private cacheService: CacheService,
  ) { }

  async getUser(user, condition?) {
    try {
      const queryBuilder = this.userRepository
        .createQueryBuilder('fs_user')
        .leftJoinAndSelect('fs_user.roles', 'fs_role')
        .leftJoinAndSelect('fs_role.menus', 'fs_menu')
        .where({ id: user.sub })





      if (condition?.title) {
        //根据菜单title模糊查询
        queryBuilder.andWhere('fs_menu.title LIKE :title', { title: `%${condition.title}%` })
      }
      if (condition?.status) {
        //根据菜单状态查询
        queryBuilder.andWhere('fs_menu.status = :status', { status: condition.status })
      }

      queryBuilder.orderBy('fs_menu.order_num', 'ASC')

      const User = await queryBuilder.getOne();
      return User

    } catch (error) {
      console.log(error);

      throw new ApiException('查询失败', ApiErrorCode.COMMON_CODE);
    }

  }
  async getInfo(req): Promise<GetInfoVo> {
    //user.guard中注入的解析后的JWTtoken的user
    const { user } = req;
    //根据关联关系通过user查询user下的菜单和角色
    const userInfo: User = await this.getUser(user)

    //返回的个人信息
    const userRes = {
      avatar: `${fileConfig.fileSaveUrl}${userInfo.avatar}`,
      username: userInfo.username,
      telephone: userInfo.telephone,
    }
    //是否为超级管理员,是的话查询所有菜单和权限
    const isAdmin = userInfo?.is_admin === 1;
    let routers: Menu[] = [];
    let permissions: string[] = [];
    if (isAdmin) {
      routers = await this.menuRepository.find({
        order: {
          order_num: 'ASC',

        },
        where: {
          status: 1,

        },
      });
      //获取菜单所拥有的权限
      permissions = filterPermissions(routers);
      //存储当前用户的权限
      //await this.cacheService.set(`${user.sub}_permissions`, permissions, null);
      return {
        routers: convertToTree(routers, null, 1),
        permissions: permissions,
        user: userRes,
      };
    }


    //根据id去重


    routers = rolesToMenus(userInfo?.roles);
    permissions = filterPermissions(routers);
    await this.cacheService.set(`${user.sub}_permissions`, permissions, 7200);

    return {
      routers: convertToTree(routers),
      permissions,
      user: userRes,
    };
  }

  //菜单列表查询
  async findMenuList(findMenuListDto: FindMenuListDto, req) {
    //user.guard中注入的解析后的JWTtoken的user
    const { user } = req;
    let menuList
    //根据关联关系通过user查询user下的菜单和角色,并根据findMenuListDto条件查询,条件字段为空默认匹配所有


    if (user?.is_admin === 1) {
      //超级管理员查询所有菜单
      const condition = {}
      if (findMenuListDto.status || findMenuListDto.status === 0) {
        condition['status'] = findMenuListDto.status
      }
      if (findMenuListDto.title) {
        condition['title'] = Like(`%${findMenuListDto.title}%`)
      }
      menuList = await this.menuRepository.find({
        order: {
          order_num: 'ASC',
        },
        where: condition,
      });


    } else {
      const userList: User = await this.getUser(user, findMenuListDto);
      menuList = rolesToMenus(userList?.roles);
    };
    const treeMenuList = convertToTree(menuList);
    //是否显示树形菜单查询条件 没有传title且菜单状态为开启时候才显示树形菜单
    const isShowTreeMenu = !findMenuListDto.title && (findMenuListDto.status == 1 || !findMenuListDto.status);
    return isShowTreeMenu ? treeMenuList : menuList;
  }

  //新增菜单
  async createMenu(req, createMenuDto: CreateMenuDto) {
    const user = req?.user
    try {
      await this.menuRepository.save({ ...createMenuDto, create_by: user.sub, update_by: user.sub });
      return '菜单新增成功';
    } catch (error) {


      throw new ApiException('菜单新增失败', 20000);
    }
  }

  //修改菜单
  async updateMenu(updateMenuDto: UpdateMenuDto) {
    try {
      await this.menuRepository.update(updateMenuDto.id, updateMenuDto);
      return '菜单更新成功';
    } catch (error) {


      throw new ApiException('菜单更新失败', 20000);
    }
  }

  //删除菜单
  async deleteMenu(id: number | number[]) {
    try {
      await this.menuRepository.delete(id);
      return '菜单删除成功';
    } catch (error) {
      throw new ApiException('菜单删除失败', 20000);
    }
  }
}
