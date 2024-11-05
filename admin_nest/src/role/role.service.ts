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
      return 'success';
    } catch (error) {
      throw new ApiException('系统异常', ApiErrorCode.FAIL);
    }
  }

  async getRoles(user, condition?) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('fs_user')
      .leftJoinAndSelect('fs_user.roles', 'fs_role')
      .where({ id: user.sub })


    if (condition?.role_name) {
      //根据角色名称模糊查询
      queryBuilder.andWhere('fs_role.role_name LIKE :role_name', { role_name: `%${condition.role_name}%` })
    }
    try {
      const User = await queryBuilder.getOne()
      return User.roles
    } catch (error) {
      throw new ApiException('角色查询失败', ApiErrorCode.COMMON_CODE);
    }

  }

  //查询当前用户角色列表
  async findRoleList(req, findMenuListDto): Promise<Role[]> {
    return await this.getRoles(req.user, { role_name: findMenuListDto.role_name });
  }

  //删除角色
  async deleteRole(id): Promise<string> {
    try {
      await this.roleRepository.delete(id);
      return '删除成功';
    } catch (error) {
      throw new ApiException('删除失败', ApiErrorCode.COMMON_CODE);
    }
  }


  //修改角色
  async updateRole(updateRoleDto: UpdateRoleDto) {
    try {
      await this.menuRepository.update(updateRoleDto.id, updateRoleDto);
      return '角色更新成功';
    } catch (error) {
      throw new ApiException('角色更新失败', 20000);
    }
  }
}
