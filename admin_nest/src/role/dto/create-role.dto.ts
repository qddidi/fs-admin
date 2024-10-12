import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
  @IsNotEmpty({ message: '角色名不可为空' })
  @ApiProperty({
    example: '技术人员',
  })
  role_name: string;

  @ApiProperty({
    example: '备注',
    required: false,
  })
  @IsOptional()
  remark?: string;

  @IsNotEmpty({ message: '角色状态不可为空' })
  @ApiProperty({
    example: 1,
    description: '角色状态，1表示启用，0表示禁用',
  })
  status: number;

  @ApiProperty({
    example: [1],
    required: false,
  })
  @IsOptional()
  @IsArray({
    message: 'role_ids必须是数组',
  })
  @IsNumber({}, { each: true, message: 'role_ids必须是数字数组' })
  menu_ids?: number[];

  @IsNotEmpty({ message: '排序不可为空' })
  @ApiProperty({
    example: 1,
  })
  role_sort: number;
  @IsNotEmpty({ message: '创建人id不可为空' })
  @ApiProperty({
    example: 1,
  })
  create_by: number;
  @IsNotEmpty({ message: '更新人id不可为空' })
  @ApiProperty({
    example: 1,
  })
  update_by: number;
}
