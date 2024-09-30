import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('角色模块')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('createRole')
  @ApiParam({
    name: 'CreateRoleDto',
    type: CreateRoleDto,
  })
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
}
