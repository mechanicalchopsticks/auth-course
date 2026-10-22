import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './database/db.module.js';
import { RedisModule } from './redis/redis.module.js';
import { User } from './user/user.entity.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule.forRoot({
      entities: [User]
    }),
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
