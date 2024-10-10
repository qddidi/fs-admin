import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('fs_menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;
  //标题
  @Column({
    length: 20,
  })
  title: string;
  //排序
  @Column()
  order_num: number;
  //父id
  @Column({ nullable: true })
  parent_id: number;

  //菜单类型 1:目录,2:菜单,3:按钮
  @Column()
  menu_type: number;
  //菜单图标
  @Column({
    length: 50,
    nullable: true,
  })
  icon: string;

  //组件路径
  @Column({
    length: 50,
    nullable: true,
  })
  component: string;

  //权限标识
  @Column({
    length: 50,
    nullable: true,
  })
  permission: string;
  //路由
  @Column({
    length: 50,
  })
  path: string;

  @Column({
    type: 'bigint',
  })
  create_by: number;

  //状态 1:启用 0:禁用
  @Column({
    default: 1,
  })
  status: number;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
