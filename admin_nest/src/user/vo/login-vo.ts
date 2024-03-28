import { ApiProperty } from '@nestjs/swagger';

export class LoginVo {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: 'eyJhbG...' })
  data: string;
  @ApiProperty({ example: '请求成功' })
  describe: string;
}
