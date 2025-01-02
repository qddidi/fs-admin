import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Like, Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import encry from '../utils/crypto';
import generateCaptcha from 'src/utils/generateCaptcha';
import { CacheService } from 'src/cache/cache.service';
import { Menu } from 'src/menu/entities/menu.entity';
import { FindUserListDto } from './dto/find-user.dto';
import { exportExcel, importExcel } from 'src/utils/common';
import fileconfig from 'src/config/file';
import { mapUserZh, transformZnToEn } from 'src/config/excelHeader';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';
import { Request } from 'express';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    private jwtService: JwtService,
    private cacheService: CacheService,
  ) { }
  //注册(暂时不考虑使用,注册由管理员添加)
  async register(createUserDto: CreateUserDto) {
    const { username, password, captcha, id } = createUserDto;


    //获取缓存的验证码
    const cacheCaptcha = await this.cacheService.get(id);


    if (captcha.toLowerCase() !== cacheCaptcha?.toLowerCase()) {
      throw new ApiException('验证码错误或已过期', ApiErrorCode.COMMON_CODE);
    }
    const existUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existUser)
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);
    try {
      const newUser = new User();
      newUser.username = username;
      newUser.password = password;
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //创建用户
  async create(createUserDto: CreateUserDto): Promise<string> {
    const userExists = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userExists)
      throw new ApiException('用户已存在', ApiErrorCode.USER_EXIST);
    try {
      let newUser = new User();
      if (createUserDto.role_ids?.length) {
        //查询需要绑定的角色列表(自动在关联表生成关联关系)
        const roleList = await this.roleRepository.find({
          where: {
            id: In(createUserDto.role_ids),
          },
        });

        newUser.roles = roleList;

      }
      newUser.password = createUserDto.password;
      newUser.nickname = createUserDto.nickname;
      newUser.email = createUserDto.email;
      newUser.telephone = createUserDto.telephone;
      newUser.status = createUserDto.status;
      newUser.username = createUserDto.username;


      await this.userRepository.save(newUser);
      return '创建成功';
    } catch (error) {
      console.log(error);

      throw new ApiException('创建失败', ApiErrorCode.FAIL);
    }
  }
  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user)
      throw new ApiException('用户名不存在', ApiErrorCode.USER_NOTEXIST);
    return user;
  }

  async login(loginDto: LoginDto) {
    const { username, password, captcha, id } = loginDto;
    //缓存的验证码
    const cacheCaptcha = await this.cacheService.get(id);
    if (captcha.toLowerCase() !== cacheCaptcha?.toLowerCase()) {
      throw new ApiException('验证码错误', ApiErrorCode.COMMON_CODE);
    }
    const user = await this.findOne(username);


    if (user.password !== encry(password, user.salt)) {
      throw new ApiException('密码错误', ApiErrorCode.PASSWORD_ERR);
    }

    const payload = { username: user.username, sub: user.id, is_admin: user.is_admin };
    const token = await this.jwtService.signAsync(payload);
    this.cacheService.set(token, token, 7200);

    return token;
  }
  async logout(req) {

    const [_type, token] = req.headers.authorization?.split(' ') ?? []

    await this.cacheService.del(token || '');
    return '退出成功';
  }
  //生成验证码
  getCaptcha() {
    const { id, captcha } = generateCaptcha();
    this.cacheService.set(id, captcha.text, 60);
    return { id, img: captcha.data };
  }


  //用户查询
  async findUserList(findUserListDto: FindUserListDto) {
    const condition = {};

    if (findUserListDto.username) {
      condition['username'] = Like(`%${findUserListDto.username}%`);
    }
    if (findUserListDto.email) {
      condition['email'] = Like(`%${findUserListDto.email}%`);
    }
    if (findUserListDto.begin_time && findUserListDto.end_time) {
      condition['create_time'] = Between(findUserListDto.begin_time, findUserListDto.end_time);
    }
    if (findUserListDto.status) {
      condition['status'] = findUserListDto.status;
    }
    try {
      const [list, total] = await this.userRepository.findAndCount({
        where: condition,
        skip: (findUserListDto.page_num - 1) * findUserListDto.page_size,
        take: findUserListDto.page_size,
        relations: ['roles'],
        select: [
          'id',
          'username',
          'nickname',
          'email',
          'telephone',
          'status',
          'create_time',
          'update_time',
          'roles',
        ]
      });
      return {
        total,
        list
      };
    } catch (error) {
      throw new ApiException('查询失败', ApiErrorCode.FAIL);
    }

  }

  //用户删除
  async deleteUser(ids: number | number[]) {

    try {
      const deleteList = await this.userRepository.find({
        where: {
          id: In(Array.isArray(ids) ? ids : [ids]),
        },
      });
      const isAdmin = deleteList.some(item => item.is_admin === 1)
      if (isAdmin) {
        throw Error('管理员账户禁止删除');
      }
      await this.userRepository.delete(ids);
      return '删除成功';
    } catch (error) {

      throw new ApiException(error.message, ApiErrorCode.FAIL);
    }
  }

  //用户修改
  async updateUser(updateUserDto) {
    try {
      const newUser = new User();
      //查询需要绑定的角色列表(自动在关联表生成关联关系)
      if (Array.isArray(updateUserDto.role_ids)) {
        const role = await this.roleRepository.find({
          where: {
            id: In(updateUserDto.role_ids),
          },
        });
        newUser.roles = role;
      }



      //newUser.password = updateUserDto.password;
      newUser.nickname = updateUserDto.nickname;
      newUser.email = updateUserDto.email;
      newUser.telephone = updateUserDto.telephone;
      newUser.status = updateUserDto.status;
      newUser.username = updateUserDto.username;
      newUser.id = updateUserDto.id;
      await this.userRepository.save(newUser);
      return '修改成功';
    } catch (error) {
      console.log(error);

      throw new ApiException('修改失败', ApiErrorCode.FAIL);
    }
  }

  //导出
  async export(findUserListDto: FindUserListDto) {

    try {
      const { list } = await this.findUserList(findUserListDto)

      const excelBuffer = await exportExcel(list, mapUserZh);
      return excelBuffer;

    } catch (error) {
      throw new ApiException('导出失败', ApiErrorCode.FAIL);
    }
  }

  //导入
  async upload(file) {

    const fileSplitArr = file.originalname.split('.');
    const fileType = fileSplitArr[fileSplitArr.length - 1];
    if (fileType !== 'xlsx' && fileType !== 'xls')
      throw new ApiException('请上传xlsx或xls格式的文件', ApiErrorCode.COMMON_CODE)

    //解析后的数据
    const excelData = importExcel(file.buffer)
    //转换为数据库需要的格式
    const importData = transformZnToEn(excelData, mapUserZh)


    const hasUseName = importData.map(item => item.username)
    const isExist = await this.userRepository.findOne({
      where: {
        username: In(hasUseName)
      }
    })
    if (isExist) {
      throw new ApiException('导入用户包含已存在的用户,请核对后再进行导入', ApiErrorCode.COMMON_CODE);
    }
    try {
      await this.userRepository.save(importData);
    } catch (error) {
      throw new ApiException('导入数据库失败', ApiErrorCode.FAIL)
    }
    return '导入成功';
  }

  //个人信息
  async getUserInfo(req) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: req.user.sub
        }
      })

      user.avatar = process.env.FILESAVEURL + user.avatar

      return user
    } catch (error) {
      throw new ApiException('查询个人信息失败', ApiErrorCode.FAIL)
    }

  }

  //头像上传
  async uploadAvatar(path: string, req) {
    throw new ApiException('演示项目禁止上传', ApiErrorCode.FORBIdEN)
    const { user } = req
    try {
      await this.userRepository.update({ id: user.sub }, { avatar: path })
      return '上传成功';
    } catch (error) {
      throw new ApiException('上传失败', ApiErrorCode.FAIL)
    }
  }
  //个人信息修改
  async updateUserInfo(req, updateUserDto: UpdateUserDto) {
    const id = req.user.sub
    try {
      const newUser = new User();
      //newUser.password = updateUserDto.password;
      newUser.nickname = updateUserDto.nickname;
      newUser.email = updateUserDto.email;
      newUser.telephone = updateUserDto.telephone;
      newUser.id = id;
      await this.userRepository.save(newUser);
      return '修改成功';
    } catch (error) {

      throw new ApiException('修改失败', ApiErrorCode.FAIL);
    }
  }

  //修改密码
  async updatePassword(req: Request & { user: any }, updatePasswordDto: UpdateUserPasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const id = req.user.sub;
    try {
      const user = await this.userRepository.findOne({
        where: {
          id
        }
      })
      //判断输入的原密码是否正确
      if (user.password !== encry(oldPassword, user.salt)) {
        throw Error('原密码错误');
      }
      //加密新密码并更新密码
      user.password = encry(newPassword, user.salt);
      await this.userRepository.update(id, { password: user.password });
      return '修改成功';
    } catch (error) {
      throw new ApiException(error.message, ApiErrorCode.FAIL);
    }
  }

}
