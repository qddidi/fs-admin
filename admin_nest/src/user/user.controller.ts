import { Controller, Post, Body, UseGuards, Get, Query, Delete, Param, Put, Res, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { CreateUserVo } from './vo/create-user.vo';
import { LoginDto } from './dto/login-dto';
import { CaptchaVo } from './vo/captcha-vo';
import { Public } from 'src/public/public.decorator';
import { LoginVo } from './vo/login-vo';
import { FindUserListDto } from './dto/find-user.dto';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { Response, Request } from 'express';
import { Multer, diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import fileconfig from 'src/config/file';
import { checkDirExists, deleteOldFile } from 'src/utils/fileUtils';
import { UploadFileDto } from './dto/upload-file.dto';
@ApiTags('用户模块')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Public()
  @ApiOperation({
    summary: '用户注册', // 接口描述信息
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

  @ApiOkResponse({
    description: '返回示例',
    type: LoginVo,
  })
  login(@Body() loginDto: LoginDto) {

    return this.userService.login(loginDto);
  }

  @ApiOperation({
    summary: '退出登录',
  })
  @Post('logout')
  loginOut(@Req() req: Request) {
    return this.userService.logout(req);
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
  @ApiOperation({ summary: '用户管理-更新' })
  async updateUser(
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Multer.File, @Body() _body: UploadFileDto) {
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: async (req, _file, cb) => {
        //保存文件地址
        const saveDirectory = path.join(process.cwd(), fileconfig.saveDirectory, String(req.user.sub));
        // 检查目录是否存在，如果不存在则创建
        checkDirExists(saveDirectory);
        req.saveDirectory = saveDirectory;
        cb(null, saveDirectory)
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);


        if (!ext.match(/\.(jpg|jpeg|png|gif)$/i)) {
          cb(new ApiException('请上传图片类型文件', ApiErrorCode.COMMON_CODE), null)
          return
        }
        if (file.size > 500 * 1024) {
          cb(new ApiException('图片大小不能超过500k', ApiErrorCode.COMMON_CODE), null)
          return
        }
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        const filename = `${fileconfig.avatarPrefix}_${uniqueSuffix}${ext}`;
        req.filename = filename;
        cb(null, filename);
      },
    }),
  }))
  async uploadAvatar(@Req() req: Request & { filename: string, user: any }, @Body() _body: UploadFileDto) {
    /**
     * 此时最新头像图片已经保存,需要删除旧头像图片
     * 
     * 头像存放目录 newAvatarDir
     */
    const newAvatarDir = path.join(process.cwd(), fileconfig.saveDirectory, String(req.user.sub))
    console.log(req.filename);
    //查找当前用户目录下所有头像,如果不是最新头像文件,则删除
    deleteOldFile(newAvatarDir, req.filename, fileconfig.avatarPrefix)
    return await this.userService.uploadAvatar(`${fileconfig.saveDirectory}${req.user.sub}/${req.filename}`, req);
  }


  //修改个人信息
  @Put('/updateUserInfo')
  @ApiOperation({ summary: '修改个人信息' })
  async updateUserInfo(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUserInfo(req, updateUserDto);
  }

  //修改密码
  @Put('/updatePassword')
  @ApiOperation({ summary: '修改密码' })
  async updatePassword(@Req() req: Request & { user: any }, @Body() updateUserDto: UpdateUserPasswordDto) {
    return await this.userService.updatePassword(req, updateUserDto);
  }
}


