import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([Role, Menu, User])],
})
export class RoleModule { }
