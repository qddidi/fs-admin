import { Body, Controller, Get, Post, UseGuards, Query, Put, Delete, Param, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { FindMenuListDto } from './dto/findMenu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { pick } from 'src/utils/common';

@Controller('menu')
@ApiTags('菜单权限模块')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }
  @Post('getInfo')
  @ApiOperation({ summary: '获取路由' })
  async getInfo(@Request() req) {
    return await this.menuService.getInfo(req);
  }

  @Get('/list')
  @ApiParam({ name: 'findMenuListDto', type: FindMenuListDto })
  @Permissions('system:menu:list')
  @ApiOperation({ summary: '菜单管理-查询' })
  async list(@Query() findMenuListDto: FindMenuListDto, @Request() req) {

    return await this.menuService.findMenuList(findMenuListDto, req);
  }

  // @Public()
  // @Post('/test')
  // async test(@Request() req) {

  //   return "success";
  // }
  //新增菜单
  @Post('createMenu')
  @Permissions('system:menu:create')
  @ApiParam({ name: 'createMenuDto', type: CreateMenuDto })
  @ApiOperation({ summary: '菜单管理-新增' })
  async createMenu(
    @Request() req,
    @Body()
    createMenuDto: CreateMenuDto,
  ) {


    return await this.menuService.createMenu(req, createMenuDto);
  }

  //更新菜单
  @Put('updateMenu')
  @Permissions('system:menu:edit')
  @ApiParam({ name: 'updateMenu', type: UpdateMenuDto })
  @ApiOperation({ summary: '菜单管理-更新' })

  async updateMenu(
    @Body()
    updateMenuDto: UpdateMenuDto,
  ) {
    //过滤掉不需要的字段
    const filterUpdateMenuDto = pick(updateMenuDto, ['id', 'title', 'order_num', 'parent_id', 'menu_type', 'icon', 'path', 'component', 'permission', 'status', 'catch'])
    return await this.menuService.updateMenu(filterUpdateMenuDto);
  }

  @ApiOperation({
    summary: '菜单管理-删除',
  })
  @Permissions('system:menu:delete')
  @ApiParam({
    name: 'menuId',
    type: 'string',
    description: '菜单ID',
    required: true,
    examples: {
      'example1': {
        value: '1,2,3',
        summary: '示例菜单ID',
      },
    },
  })
  @Delete('deleteMenu/:menuId')
  deleteMenu(@Param('menuId') menuId: string) {
    return this.menuService.deleteMenu(menuId.split(',').map(Number));
  }

}
