import { Controller, Get, Query, Res } from '@nestjs/common';
import { LogService } from './log.service';
import { FindListDto } from './dto/find-list.dto';
import { LogOperationTitle } from 'src/common/decorators/oprertionlog.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { Response } from 'express';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) { }

  //日志查询
  @LogOperationTitle('日志查询')
  @ApiOperation({ summary: '日志管理-查询' })
  @Permissions('system:log:list')
  @Get('list')
  findLogList(@Query() findListDto: FindListDto) {
    return this.logService.findList(findListDto);
  }

  //日志导出
  @LogOperationTitle('日志导出')
  @ApiOperation({ summary: '日志管理-导出' })
  @Get('export')
  async export(@Query() findListDto: FindListDto, @Res() res: Response) {
    try {
      const data = await this.logService.export(findListDto);
      res.send(data);
    } catch (error) {
      throw new ApiException('导出失败', ApiErrorCode.FAIL);
    }


  }
}
