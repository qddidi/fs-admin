import { ApiProperty } from '@nestjs/swagger';
interface Data {
  id: string;
  img: string;
}
export class CaptchaVo {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({
    example: { id: 'b3c0dffaeb9aa366c3c8', img: '<svg xmlns="htt...' },
  })
  data: Data;
  @ApiProperty({ example: '请求成功' })
  describe: string;
}
