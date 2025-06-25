import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AppController } from './app.controller';
import { RedisService } from './modules/redis/redis.service';
import { Note } from './modules/notes/notes.entity';
import { CounterModule } from './modules/counter/counter.module';
import { NotesModule } from './modules/notes/notes.module';
import { RedisModule as CustomRedisModule } from './modules/redis/redis.module'; // Import RedisModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST', 'mysql'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('MYSQL_USER', 'root'),
        password: configService.get<string>('MYSQL_PASSWORD', ''),
        database: configService.get<string>('MYSQL_DATABASE', 'notes_db'),
        synchronize: true, // Only for development
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Note]),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'single',
        url: `redis://${configService.get<string>('REDIS_HOST', 'redis')}:${configService.get<number>('REDIS_PORT', 6379)}`,
      }),
      inject: [ConfigService],
    }),
    CounterModule,
    NotesModule,
    CustomRedisModule, // Add RedisModule
  ],
  controllers: [AppController],
  providers: [RedisService],
})
export class AppModule {}
