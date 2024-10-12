import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { In, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { convertToTree } from 'src/utils/convertToTree';
@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createMenu(createMenuDto: CreateMenuDto) {
    try {
      await this.menuRepository.save(createMenuDto);
      return '菜单新增成功';
    } catch (error) {
      throw new ApiException('菜单新增失败', 20000);
    }
  }
  async getRouters(req): Promise<Menu[]> {
    //user.guard中注入的解析后的JWTtoken的user
    const { user } = req;
    //根据关联关系通过user查询user下的菜单和角色
    const userList: User = await this.userRepository
      .createQueryBuilder('fs_user')
      .leftJoinAndSelect('fs_user.roles', 'fs_role')
      .leftJoinAndSelect('fs_role.menus', 'fs_menu')
      .where({ id: user.sub })
      .orderBy('fs_menu.order_num', 'ASC')
      .getOne();

    //是否为超级管理员,是的话查询所有菜单
    const isAdmin = userList.roles?.find((item) => item.role_name === 'admin');
    let routers: Menu[] = [];

    if (isAdmin) {
      routers = await this.menuRepository.find({
        order: {
          order_num: 'ASC',
        },
        where: {
          status: 1,
        },
      });
      return convertToTree(routers);
    }
    interface MenuMap {
      [key: string]: Menu;
    }
    // console.log(userList.roles[0].menus);

    //根据id去重
    const menus: MenuMap = userList?.roles.reduce(
      (mergedMenus: MenuMap, role: Role) => {
        role.menus.forEach((menu: Menu) => {
          mergedMenus[menu.id] = menu;
        });
        return mergedMenus;
      },
      {},
    );

    routers = Object.values(menus);

    return convertToTree(routers);
  }
}
