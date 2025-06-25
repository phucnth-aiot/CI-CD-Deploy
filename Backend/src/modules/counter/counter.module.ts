import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from './counter.entity';
import { CounterService } from './counter.service';
import { CounterController } from './counter.controller';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Counter])],
  providers: [CounterService, RedisService],
  controllers: [CounterController],
  exports: [CounterService, TypeOrmModule.forFeature([Counter])],
})
export class CounterModule {}
