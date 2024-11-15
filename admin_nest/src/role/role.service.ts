import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { Menu } from 'src/menu/entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateRoleDto } from './dto/update-role.dto';
import { FindMenuListDto } from 'src/menu/dto/findMenu.dto';
import { FindRoleListDto } from './dto/find-role.dto';
import { handlePage } from 'src/utils/handlePage';
import { pick } from 'src/utils/common';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  //新增角色
  async create(createRoleDto: CreateRoleDto): Promise<string> {
    const row = await this.roleRepository.findOne({
      where: { role_name: createRoleDto.role_name },
    });
    if (row) {
      throw new ApiException('角色已存在', ApiErrorCode.COMMON_CODE);
    }
    const newRole = new Role();
    if (createRoleDto.menu_ids?.length) {
      const menuList = await this.menuRepository.find({
        where: {
          id: In(createRoleDto.menu_ids),
        },
      });
      newRole.menus = menuList;
    }
    try {
      await this.roleRepository.save({ ...createRoleDto, ...newRole });
      return '新增成功';
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL);
    }
  }



  //查询当前用户角色列表
  async findRoleList(findMenuListDto: FindRoleListDto) {
    let queryBuilder = this.roleRepository.createQueryBuilder('fs_role')

    if (findMenuListDto.role_name) {
      queryBuilder.andWhere('role_name like :role_name', { role_name: `%${findMenuListDto?.role_name}%` });
    }
    if (findMenuListDto.status) {
      queryBuilder.andWhere('status = :status', { status: findMenuListDto.status });
    }
    if (findMenuListDto.begin_time && findMenuListDto.end_time) {
      queryBuilder.andWhere('create_time BETWEEN :start AND :end', { start: findMenuListDto.begin_time, end: findMenuListDto.end_time });
    }

    handlePage(queryBuilder, findMenuListDto.page_num, findMenuListDto.page_size)
    queryBuilder.orderBy('fs_role.role_sort', 'ASC')
    queryBuilder.leftJoinAndSelect('fs_role.menus', 'menu');

    const [list, count] = await queryBuilder.getManyAndCount();
    return { list, total: count };
  }

  //删除角色
  async deleteRole(ids: number[]): Promise<string> {
    try {
      await this.roleRepository.delete(ids);
      return '删除成功';
    } catch (error) {
      throw new ApiException('删除失败', ApiErrorCode.COMMON_CODE);
    }
  }


  //修改角色
  async updateRole(updateRoleDto: UpdateRoleDto) {
    //过滤掉不需要的字段
    const filterUpdateRoleDto = pick(updateRoleDto, ['id', 'role_name', 'remark', 'role_sort', 'order_num', 'menu_ids', 'status']);
    try {
      await this.roleRepository.update(updateRoleDto.id, filterUpdateRoleDto);
      return '角色更新成功';
    } catch (error) {
      console.log(error);


      throw new ApiException('角色更新失败', 20000);
    }
  }
}
