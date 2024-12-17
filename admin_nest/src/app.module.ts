import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from './cache/cache.module';
import { JwtModule } from '@nestjs/jwt';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import * as path from 'path';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PermissionsGuard } from './common/guards/permissions.guard';
import { UserGuard } from './common/guards/user.guard';
import { LogModule } from './log/log.module';
import { OperationLogInterceptor } from './common/interceptor/log/log.interceptor';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
const isProd = process.env.NODE_ENV == 'production';
console.log({ isProd });

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [isProd ? path.resolve('.env.prod') : path.resolve('.env')],
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          connectorPackage: 'mysql2', //驱动包
          port: configService.get('DB_PORT'), // 端口号
          username: configService.get('DB_USER'), // 用户名
          password: configService.get('DB_PASSWD'), // 密码
          database: configService.get('DB_DATABASE'), //数据库名
          //entities: [User], //数据库对应的Entity
          entities: ['**/*.entity.js'],

          autoLoadEntities: true, //自动加载实体
          synchronize: !isProd, //是否自动同步实体文件,生产环境建议关闭
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXP'),
          },
        };
      },
    }),

    CacheModule,

    MenuModule,

    RoleModule,

    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: UserGuard,
  }, {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    // 注册全局拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: OperationLogInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    }
  ],
})
export class AppModule { }
