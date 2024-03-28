import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserVo } from './vo/create-user.vo';
import { LoginDto } from './dto/login-dto';
import { UserGuard } from './user.guard';
import { Public } from 'src/public/public.decorator';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @ApiOperation({
    summary: '添加用户', // 接口描述信息
  })
  @ApiOkResponse({
    description: '返回示例',
    type: CreateUserVo,
  })
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('login')
  @ApiOkResponse({
    description: '返回示例',
    type: CreateUserVo,
  })
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
  //@UseGuards(UserGuard)
  @Post('test')
  test() {
    return 1;
  }
  @Public()
  @Get('captcha')
  getCaptcha() {
    return this.userService.getCaptcha();
  }
}
