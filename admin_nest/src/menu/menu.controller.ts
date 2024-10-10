import { Body, Controller, Post } from '@nestjs/common';
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
  @Post('/getRouters')
  @ApiOperation({ summary: '获取路由' })
  async getRouters(@Request() req) {
    return await this.menuService.getRouters(req);
  }
}
