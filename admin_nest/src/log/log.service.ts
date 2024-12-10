import { Injectable } from '@nestjs/common';
import { OperationLog } from './entities/operationLog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class LogService {
    constructor(
        @InjectRepository(OperationLog)
        private readonly operationLog: Repository<OperationLog>
    ) { }
    // 保存操作日志
    async saveOperationLog(operationLog: OperationLog) {
        await this.operationLog.save(operationLog);
    }
}
