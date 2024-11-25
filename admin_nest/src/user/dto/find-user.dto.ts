import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FindUserListDto {
    @IsOptional()
    @ApiProperty({
        example: '用户名',
        required: false,
    })
    username?: string;
    @IsOptional()
    @ApiProperty({
        example: '手机号',
        required: false,
    })
    telephone?: string;
    @IsOptional()
    @ApiProperty({
        example: '邮箱',
        required: false,
    })
    email?: string;
    @IsOptional()
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