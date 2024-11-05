import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FindRoleListDto {
    @ApiProperty({
        example: '角色名称',
        required: false,
    })
    @IsOptional()
    role_name?: string;

}