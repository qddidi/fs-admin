import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';
import * as moment from 'moment';
@Entity('fs_role')
export class Role {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;
  //角色名
  @Column({
    length: 20,
  })
  role_name: string;
  //排序
  @Column()
  role_sort: number;
  //角色状态 启用:1 关闭:0
  @Column({
    default: 1,
  })
  status: number;
  //备注
  @Column({ length: '100', nullable: true })
  remark: string;
  //创建人Id
  @Column({
    type: 'bigint',

  })
  create_by: number;
  //更新人Id
  @Column({
    type: 'bigint',

  })
  update_by: number;

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

  @ManyToMany(() => Menu)
  @JoinTable({
    name: 'fs_role_menu_relation',
  })
  menus: Menu[];
}
