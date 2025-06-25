import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './modules/notes/notes.entity';
import { RedisService } from './modules/redis/redis.service';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    private readonly redisService: RedisService
  ) {}

  @Get('test-redis')
  async testRedis(): Promise<{ message: string; value: string | null }> {
    await this.redisService.setKey('test_key', 'Hello Redis');
    const value = await this.redisService.getKey('test_key');
    return { message: 'Redis test', value };
  }
}
