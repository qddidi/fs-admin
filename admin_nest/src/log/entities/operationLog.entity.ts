import * as moment from "moment";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
//操作日志表
@Entity('fs_operation_log')
export class OperationLog {
    @PrimaryGeneratedColumn()
    id: number; // 标记为主键，值自动生成
    @Column({ length: 100, nullable: true })
    title: string; //系统模块
    @Column({ length: 20, nullable: true })
    operation_type: string; //操作类型
    @Column({ length: 20, nullable: true })
    method: string; //请求方式
    @Column({ length: 255, nullable: true })
    params: string; //参数
    @Column({ length: 30, nullable: true })
    ip: string; //ip
    @Column({ length: 255, nullable: true })
    url: string; //地址
    @Column({ length: 500, nullable: true })
    user_agent: string; //浏览器
    @Column({ length: 20, nullable: true })
    username: string; //操作人员
    @CreateDateColumn({
        transformer: {
            to: (value) => {
                return value
            },
            from: (value) => {
                return moment(value).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    })
    create_time: Date;

    @UpdateDateColumn({
        transformer: {
            to: (value) => {
                return value
            },
            from: (value) => {
                return moment(value).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    })
    update_time: Date;
}