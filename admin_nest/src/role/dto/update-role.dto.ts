import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateRoleDto {

    @IsNotEmpty({ message: 'id不可为空' })
    @ApiProperty({
        example: 1,
    })
    id: number;
    @ApiProperty({
        example: '角色名称',
        required: false,
    })
    @IsOptional()
    role_name?: string;

    @ApiProperty({
        example: '角色描述',
        required: false,
    })
    @IsOptional()
    description?: string;

    @ApiProperty({
        example: '角色排序',
        required: false,
    })
    @IsOptional()
    order_num?: number;
}