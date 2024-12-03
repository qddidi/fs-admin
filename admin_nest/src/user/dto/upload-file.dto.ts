import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';


export class UploadFileDto {
    @ApiProperty({
        example: '文件',
        required: true,
        type: 'file',
    })
    file: string;

}
