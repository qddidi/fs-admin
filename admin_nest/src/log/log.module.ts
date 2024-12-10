import { Global, Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { OperationLog } from './entities/operationLog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Global()
@Module({
  controllers: [LogController],
  providers: [LogService],
  imports: [TypeOrmModule.forFeature([OperationLog])],
  exports: [LogService],
})
export class LogModule { }
