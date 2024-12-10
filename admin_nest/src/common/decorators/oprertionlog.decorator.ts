import { SetMetadata } from '@nestjs/common';

// 操作日志装饰器,设置操作日志模块名
export const LogOperationTitle = (title: string) =>
    SetMetadata('logOperationTitle', title);
