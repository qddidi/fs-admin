import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  MinLength,
  Length,
  IsOptional,
  IsArray,
  IsNumber,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @ApiProperty({
    example: 'admin',
    description: '用户名',
  })
  username: string;

  @ApiProperty({
    example: 'xihu',
    description: '昵称',
  })
  nickname: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @MinLength(6, {
    message: '密码不能少于6位',
  })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;

  @IsOptional()
  @ApiProperty({
    example: '1',
    description: '状态',
    required: false,
  })
  status: number;

  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'id',
    required: false,
  })
  id: number;

  @IsOptional()
  @ApiProperty({
    example: 'dasw',
    required: false,
    description: '验证码',
  })
  captcha: string;
  @ApiProperty({
    example: [1],
    required: false,
  })
  @IsOptional()
  @IsArray({
    message: 'role_ids必须是数组',
  })
  @IsNumber({}, { each: true, message: 'role_ids必须是数字数组' })
  role_ids: number[];

  @IsOptional()
  @ApiProperty({
    example: '18255555555',
    required: false,
    description: '手机号',
  })
  @IsPhoneNumber('CN', {
    message: '手机号格式不正确',
  })
  telephone: string;
  @ApiProperty({
    example: '18255555555@qq.com',
    required: false,
    description: '邮箱',
  })
  @IsOptional()
  @IsEmail({}, {
    message: '邮箱格式不正确',

  })
  email: string;


}
