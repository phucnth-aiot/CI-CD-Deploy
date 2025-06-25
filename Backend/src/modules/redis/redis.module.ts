import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // không cần entity nào, nhưng vẫn khai báo để tránh lỗi
    TypeOrmModule.forFeature([]),
  ],
  controllers: [RedisController],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
