import { DynamicModule, Module } from '@nestjs/common';
import { DbConfig } from './db.interface.js';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({})
export class DbModule {
  public static forRoot(config: DbConfig): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            DbModule.getConnectionSettings(configService, config),
        }),
      ],
    };
  }

  private static getConnectionSettings(
    config: ConfigService,
    dbConfig: DbConfig,
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: config.getOrThrow<string>('DATABASE_URL'),
      entities: dbConfig.entities,
      synchronize: true,
      logging: true,
      ssl:
        process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
          ? false
          : { rejectUnauthorized: false },
    };
  }
}
