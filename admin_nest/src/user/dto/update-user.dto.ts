import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateUserDto extends PartialType(CreateUserDto) {

}

export class UpdateUserPasswordDto {
    @IsNotEmpty({
        message: '原密码不能为空',
    })
    @ApiProperty({
        example: '123456',
        description: '原密码',
    })
    oldPassword: string;
    @IsNotEmpty({
        message: '新密码不能为空',
    })
    @ApiProperty({
        example: '1234567',
        description: '新密码',
    })
    newPassword: string;
}