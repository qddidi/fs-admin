import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from './api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    if (exception instanceof ApiException) {
      response.status(status).json({
        code: exception.getErrorCode(),
        describe: exception.getErrorMessage(),
      });
      return;
    }

    if (Array.isArray((exception.getResponse() as any).message)) {
      response.status(200).json({
        code: ApiErrorCode.COMMON_CODE,
        describe: (exception.getResponse() as any).message?.join(','),
      });
      return
    }
    response.status(status).json({
      code: status,
      describe:
        (exception.getResponse() as any).message || exception.getResponse(),
    });
  }
}
