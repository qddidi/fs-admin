import { Controller, Post, Body, UseGuards, Get, Query, Delete, Param, Put, Res, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
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
import { Response, Request } from 'express';
import { Multer, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import fileconfig from 'src/config/file';
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

  //导入

  @Post('/upload')
  @Permissions('system:user:import')
  @ApiOperation({ summary: '用户管理-导入' })
  @ApiParam({ name: 'file', type: 'file' })
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Multer.File) {
    return await this.userService.upload(file);
  }

  //获取用户信息
  @Get('/profile')
  @ApiOperation({ summary: '获取用户信息' })
  async getUserInfo(@Req() req: Request) {
    return await this.userService.getUserInfo(req);
  }

  //头像上传

  @Post('/uploadAvatar')
  @ApiOperation({ summary: '头像上传' })
  @ApiParam({ name: 'file', type: 'file' })
  @UseInterceptors(FileInterceptor('file', {

    storage: diskStorage({
      destination: (req, _file, cb) => {
        cb(null, path.join(process.cwd(), fileconfig.saveDirectory))
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (!ext.match(/\.(jpg|jpeg|png|gif)$/i)) {
          cb(new ApiException('请上传图片', ApiErrorCode.COMMON_CODE), null)
          return
        }
        if (file.size > 500 * 1024) {
          cb(new ApiException('图片大小不能超过500k', ApiErrorCode.COMMON_CODE), null)
          return
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        req.filename = filename;
        cb(null, filename);
      },
    }),
  }))
  async uploadAvatar(@UploadedFile() file: Multer.File, @Req() req: Request & { filename: string }) {

    return await this.userService.uploadAvatar(`${fileconfig.saveDirectory}${req.filename}`, req);
  }

}
