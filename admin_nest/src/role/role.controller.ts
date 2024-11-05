import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
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

  @Public()
  @Post('createRole')
  @ApiParam({
    name: 'CreateRoleDto',
    type: CreateRoleDto,
  })
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  //查询
  @Get('findRoleList')
  @ApiOperation({
    summary: '角色管理-查询',
  })
  @ApiParam({
    name: 'CreateRoleDto',
    type: FindRoleListDto,
  })
  @Permissions('system:role:list')
  findRoleList(@Req() req, findRoleListDto: FindRoleListDto) {
    return this.roleService.findRoleList(req, findRoleListDto);
  }

  @ApiOperation({
    summary: '角色管理-删除',
  })
  @Permissions('system:role:delete')
  @Delete(':roleId')
  deleteRole(@Param('roleId') roleId: string) {
    return this.roleService.deleteRole(+roleId);
  }

  //更新角色
  @Put('/updateRole')
  @Public()
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
