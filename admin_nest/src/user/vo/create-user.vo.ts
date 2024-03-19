import { ApiProperty } from '@nestjs/swagger';

export class CreateUserVo {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: 'xxx' })
  data: string;
  @ApiProperty({ example: '请求成功' })
  describe: string;
}
