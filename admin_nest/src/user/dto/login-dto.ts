import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
export class LoginDto {
  @IsNotEmpty({
    message: '用户名不能为空',
  })
  @ApiProperty({
    example: 'admin',
    description: '用户名',
  })
  username: string;
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

  @IsNotEmpty({
    message: 'id不能为空',
  })
  @ApiProperty({
    example: '934e51cfff7b71ffc8ea',
    description: 'id',
  })
  id: string;

  @IsNotEmpty({
    message: '验证码不能为空',
  })
  @ApiProperty({
    example: 'dasw',
    description: '验证码',
  })
  captcha: string;
}
