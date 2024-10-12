import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Public } from 'src/public/public.decorator';
import { Request } from '@nestjs/common';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
@Controller('menu')
@ApiTags('菜单权限模块')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Post('/createMenu')
  @Public()
  @ApiParam({ name: 'createMenuDto', type: CreateMenuDto })
  @ApiOperation({ summary: '新增菜单' })
  async createMenu(
    @Body()
    createMenuDto: CreateMenuDto,
  ) {
    return await this.menuService.createMenu(createMenuDto);
  }
  @Post('/getInfo')
  @ApiOperation({ summary: '获取路由' })
  async getInfo(@Request() req) {
    return await this.menuService.getInfo(req);
  }

  @UseGuards(PermissionsGuard)
  @Permissions('sys:menu:list')
  @Post('/test')
  async test(@Request() req) {
    return 11;
  }
}
