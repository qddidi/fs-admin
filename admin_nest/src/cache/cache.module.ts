import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
@Module({
  providers: [
    CacheService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const client = createClient({
          socket: {
            host: configService.get('RD_HOST'),
            port: configService.get('RD_PORT'),
          },
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
