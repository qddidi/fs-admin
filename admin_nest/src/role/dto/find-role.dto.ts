import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FindRoleListDto {
    @ApiProperty({
        example: '角色名称',
        required: false,
    })
    @IsOptional()
    role_name?: string;

    @ApiProperty({
        example: '状态:0禁用,1启用',
        required: false,
    })
    status: number;
    @ApiProperty({
        example: '结束时间',
        required: false,
    })
    end_time: string;
    @ApiProperty({
        example: '开始时间',
        required: false,
    })
    begin_time: string;
    @ApiProperty({
        example: '当前页',

        required: false,
    })
    page_num: number;
    @ApiProperty({
        example: '每页条数',
        required: false,
    })
    page_size: number;
}