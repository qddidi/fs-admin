import { Controller, Post, Body, UseGuards, Get, Query, Delete, Param, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUserVo } from './vo/create-user.vo';
import { LoginDto } from './dto/login-dto';
import { CaptchaVo } from './vo/captcha-vo';
import { Public } from 'src/public/public.decorator';
import { LoginVo } from './vo/login-vo';
import { FindUserListDto } from './dto/find-user.dto';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Public()
  @ApiOperation({
    summary: '用户注册', // 接口描述信息
  })
  @ApiParam({
    name: 'CreateUserVo',
    type: CreateUserDto,
  })
  @ApiOkResponse({
    description: '返回示例',
    type: CreateUserVo,
  })
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }



  @Public()
  @ApiOperation({
    summary: '用户登录',
  })
  @Post('login')
  @ApiParam({
    name: 'LoginDto',
    type: LoginDto,
  })
  @ApiOkResponse({
    description: '返回示例',
    type: LoginVo,
  })
  login(@Body() loginDto: LoginDto) {

    return this.userService.login(loginDto);
  }

  @Public()
  @ApiOperation({
    summary: '获取验证码',
  })
  @Get('captcha')
  @ApiOkResponse({
    description: '返回示例',
    type: CaptchaVo,
  })
  getCaptcha() {
    return this.userService.getCaptcha();
  }


  @ApiOperation({
    summary: '用户管理-新增',
  })
  @Permissions('system:user:create')
  @ApiParam({ name: 'CreateUserVo', type: CreateUserDto })
  @ApiOkResponse({
    description: '返回示例',
    type: CreateUserVo,
  })
  @Post('createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiOperation({
    summary: '用户管理-查询',
  })
  @Permissions('system:user:list')
  @Get('list')
  findUserList(@Query() findUserListDto: FindUserListDto) {
    return this.userService.findUserList(findUserListDto);
  }

  @ApiOperation({
    summary: '用户管理-删除',
  })
  @Permissions('system:user:delete')
  @Delete('deleteUser/:userId')
  deleteRole(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId.split(',').map(Number));
  }

  //更新用户
  @Put('/updateUser')
  @Permissions('system:user:edit')
  @ApiParam({ name: 'updateUser', type: UpdateUserDto })
  @ApiOperation({ summary: '用户管理-更新' })
  async updateMenu(
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(updateUserDto);
  }

  //导出
  @Get('/export')
  @Permissions('system:user:export')
  @ApiOperation({ summary: '用户管理-导出' })
  async export(@Query() findUserListDto: FindUserListDto, @Res() res: Response) {

    const data = await this.userService.export(findUserListDto);
    res.send(data)
  }
}
