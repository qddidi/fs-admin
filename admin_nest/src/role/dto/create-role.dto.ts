import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
  @IsNotEmpty({ message: '角色名不可为空' })
  @ApiProperty({
    example: '技术人员',
  })
  role_name: string;
  remark?: string;
  @IsNotEmpty({ message: '角色状态不可为空' })
  @ApiProperty({
    example: 1,
  })
  status: number;

  @IsNotEmpty({ message: '请选择菜单权限' })
  @ApiProperty({
    example: 1,
  })
  menu_ids: number[];
  @IsNotEmpty({ message: '排序不可为空' })
  @ApiProperty({
    example: [1, 2],
  })
  role_sort: number;
}
