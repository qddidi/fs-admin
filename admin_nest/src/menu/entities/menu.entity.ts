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
  //菜单名称
  @Column({
    length: 20,
  })
  menu_name: string;
  //排序
  @Column()
  order_num: number;
  //父id
  @Column({ nullable: true })
  parent_id: number;
  @Column({
    length: 10,
  })
  menuType: string;
  //菜单图标
  @Column({
    length: 50,
    nullable: true,
  })
  icon: string;

  //组件路径
  @Column({
    length: 50,
  })
  component: string;

  //路由
  @Column({
    length: 50,
  })
  path: string;

  @Column({
    length: 50,
    nullable: true,
  })
  create_by: string;
  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
