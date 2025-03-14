//操作日志拦截器
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogService } from 'src/log/log.service';
import { OperationLog } from 'src/log/entities/operationLog.entity';
import { Reflector } from '@nestjs/core';
export interface Response<T> {
    data: T;
}

@Injectable()
export class OperationLogInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    constructor(
        private readonly logService: LogService,
        private readonly reflactor: Reflector,
    ) { }
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        const request = context.switchToHttp().getRequest();
        //获取当前控制器元数据中的日志logOperationTitle
        const title = this.reflactor.get<string>('logOperationTitle', context.getHandler());
        return next
            .handle().pipe(tap((res) => {
                const log = new OperationLog();
                log.title = title;
                log.method = request.method;
                log.url = request.url;
                log.ip = request.ip;
                const paramsText = JSON.stringify({ ...request.query, ...request.params, ...request.body });
                log.params = paramsText.length > 1000 ? paramsText.slice(0, 1000) : paramsText;
                log.user_agent = request.headers['user-agent'];
                log.username = request.user?.username;
                const resText = JSON.stringify(res);
                log.response = resText.length > 1000 ? resText.slice(0, 1000) : resText;
                this.logService.saveOperationLog(log).catch((err) => {
                    console.log(err);
                });
            }
            ));

    }
}