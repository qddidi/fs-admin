import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMenuDto {
  @IsNotEmpty({ message: '菜单名不可为空' })
  @ApiProperty({
    example: '菜单1',
  })
  title: string;

  @ApiProperty({
    example: 1,
  })
  order_num: number;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsOptional()
  parent_id?: number;

  @ApiProperty({
    example: 1,
  })
  menu_type: number;
  @ApiProperty({
    example: 'menu',
  })
  icon: string;

  @IsOptional()
  @ApiProperty({
    example: 'AA/BB',
    required: false,
  })
  component?: string;

  @IsNotEmpty({ message: '路由不可为空' })
  @ApiProperty({
    example: 'BB',
  })
  path: string;
  @ApiProperty({
    example: 11,
  })
  create_by: number;

  @IsOptional()
  @ApiProperty({
    example: 'sys:post:list',
    required: false,
  })
  permission?: string;
}
