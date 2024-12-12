import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FindListDto {
    @ApiProperty({
        example: '模块名称',
        required: false,
    })
    @IsOptional()
    title?: string;

    @ApiProperty({
        example: '操作人',
        required: false,
    })
    @IsOptional()
    username?: string;
    @ApiProperty({
        example: '请求地址',
        required: false,
    })
    @IsOptional()
    url?: string;

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