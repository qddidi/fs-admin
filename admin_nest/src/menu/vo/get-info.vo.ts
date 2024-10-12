import { ApiProperty } from '@nestjs/swagger';

export class GetInfoVo {
  routers: any;
  @ApiProperty({
    example: 'sys:role:list',
  })
  permissions: string[];
}
