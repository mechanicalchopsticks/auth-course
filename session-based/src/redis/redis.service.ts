import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private configService: ConfigService;
  private readonly client: RedisClientType;
  private readonly logger = new Logger(RedisService.name);

  constructor(configService: ConfigService) {
    this.configService = configService;
    this.client = createClient({
      url: configService.getOrThrow<string>('REDIS_URL'),
    });
    this.client.on('error', (err) => {
      this.logger.error(err);
    });
  }

  async onModuleInit() {
    await this.client.connect();
    this.logger.log('RedisService Connected');
  }

  getClient() {
    return this.client;
  }
}


