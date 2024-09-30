import { Body, Controller, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Public } from 'src/public/public.decorator';
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Post('/createMenu')
  @Public()
  @ApiOperation({ summary: '新增菜单' })
  async createMenu(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.createMenu(createMenuDto);
  }
  @Post('/getRoutes')
  @ApiOperation({ summary: '获取菜单列表' })
  async getRoutes() {
    return await this.menuService.getMenuList();
  }
}
