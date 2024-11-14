import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/public/public.decorator';
import { FindRoleListDto } from './dto/find-role.dto';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { UpdateRoleDto } from './dto/update-role.dto';
@Controller('role')
@ApiTags('角色模块')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }


  @Post('createRole')
  @Permissions('system:role:create')
  @ApiOperation({
    summary: '角色管理-新增',
  })
  @ApiParam({
    name: 'CreateRoleDto',
    type: CreateRoleDto,
  })
  createRole(@Req() req, @Body() createRoleDto: CreateRoleDto) {
    createRoleDto.create_by = req.user.sub;
    createRoleDto.update_by = req.user.sub;
    return this.roleService.create(createRoleDto);
  }

  //查询
  @Get('list')
  @Permissions('system:role:list')
  @ApiOperation({
    summary: '角色管理-查询',
  })
  @ApiParam({
    name: 'CreateRoleDto',
    type: FindRoleListDto,
  })

  findRoleList(@Query() findRoleListDto: FindRoleListDto) {
    return this.roleService.findRoleList(findRoleListDto);
  }

  @ApiOperation({
    summary: '角色管理-删除',
  })
  @Permissions('system:role:delete')
  @Delete('deleteRole/:roleId')
  deleteRole(@Param('roleId') roleId: string) {
    return this.roleService.deleteRole(roleId.split(',').map(Number));
  }

  //更新角色
  @Put('/updateRole')
  @Permissions('system:role:edit')
  @ApiParam({ name: 'updateRole', type: UpdateRoleDto })
  @ApiOperation({ summary: '角色管理-更新' })
  async updateMenu(
    @Body()
    updateRoleDto: UpdateRoleDto,
  ) {
    return await this.roleService.updateRole(updateRoleDto);
  }
}
