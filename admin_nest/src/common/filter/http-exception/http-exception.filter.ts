import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiException } from './api.exception';
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
    response.status(status).json({
      code: status,
      describe:
        (exception.getResponse() as any).message || exception.getResponse(),
    });
  }
}
