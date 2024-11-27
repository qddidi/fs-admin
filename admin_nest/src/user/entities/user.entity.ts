import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import encry from '../../utils/crypto';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { Role } from 'src/role/entities/role.entity';
@Entity('fs_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主键，值自动生成

  @Column({ length: 30 })
  username: string; //用户名
  @Column({ nullable: true })
  nickname: string; //昵称

  //默认密码 123456
  @Column({
    default: '20989eb67e13fdee0a42504dd0b3cf65358b'
  })
  password: string; //密码
  @Column({ nullable: true })
  avatar: string; //头像
  @Column({ nullable: true })
  email: string; //邮箱
  @Column({ nullable: true })
  telephone: string; //手机号
  @Column({
    default: 1,
  })
  status: number; //状态 0:禁用 1:启用
  @Column({ nullable: true, default: 'q5+Kdg==' })
  salt: string;
  @Column({ nullable: true, default: 0 })
  is_admin: number; //是否为管理员 1:是 0:否
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'fs_user_role_relation',
  })
  roles: Role[];
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
  @BeforeInsert()
  beforeInsert() {


    this.salt = crypto.randomBytes(4).toString('base64');
    this.password = encry(this.password, this.salt);
  }
}
