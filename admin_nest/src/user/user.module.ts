import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from 'src/cache/cache.module';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from '../common/guards/user.guard';
@Module({
  controllers: [UserController],
  providers: [
    UserService,

  ],
  imports: [TypeOrmModule.forFeature([User, Role]), CacheModule],
})
export class UserModule { }
