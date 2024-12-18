import { Injectable } from '@nestjs/common';
import { OperationLog } from './entities/operationLog.entity';
import { Between, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindListDto } from './dto/find-list.dto';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { exportExcel } from 'src/utils/common';
import { mapLogZh } from 'src/config/excelHeader';
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
    // 分页查询操作日志
    async findList(findList: FindListDto) {
        const condition = {};
        if (findList.title) {
            condition['title'] = Like(`%${findList.title}%`);
        }
        if (findList.username) {
            condition['username'] = Like(`%${findList.username}%`);
        }
        if (findList.url) {
            condition['url'] = Like(`%${findList.url}%`);
        }
        if (findList.begin_time && findList.end_time) {
            condition['create_time'] = Between(findList.begin_time, findList.end_time);
        }
        try {
            const [list, total] = await this.operationLog.findAndCount({
                skip: (findList.page_num - 1) * findList.page_size,
                take: findList.page_size,
                order: {
                    create_time: 'DESC'
                },
                where: condition
            });
            return {
                list,
                total
            };
        } catch (error) {
            throw new ApiException('查询失败', ApiErrorCode.FAIL);
        }

    }
    //日志导出
    async export(findList: FindListDto) {

        try {
            const { list } = await this.findList(findList)
            const excelBuffer = await exportExcel(list, mapLogZh);
            return excelBuffer;
        } catch (error) {
            console.log(error);

            throw new ApiException('导出失败', ApiErrorCode.FAIL);
        }
    }
}
