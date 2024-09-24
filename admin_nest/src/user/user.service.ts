import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import encry from '../utils/crypto';
import generateCaptcha from 'src/utils/generateCaptcha';
import { CacheService } from 'src/cache/cache.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private cacheService: CacheService,
  ) {}
  //注册
  async create(createUserDto: CreateUserDto) {
    const { username, password, captcha, id } = createUserDto;

    //获取缓存的验证码
    const cacheCaptcha = await this.cacheService.get(id);
    console.log({ cacheCaptcha, id });
    if (captcha !== cacheCaptcha) {
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
    // if (captcha !== cacheCaptcha) {
    //   throw new ApiException('验证码错误', ApiErrorCode.COMMON_CODE);
    // }
    const user = await this.findOne(username);
    if (user.password !== encry(password, user.salt)) {
      throw new ApiException('密码错误', ApiErrorCode.PASSWORD_ERR);
    }

    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    this.cacheService.set(token, token, 7200);
    return token;
  }
  //生成验证码
  getCaptcha() {
    const { id, captcha } = generateCaptcha();
    this.cacheService.set(id, captcha.text, 60);
    console.log(captcha.text);
    return { id, img: captcha.data };
  }
}
