import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './modules/notes/notes.entity';
import { RedisService } from './modules/redis/redis.service';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    private readonly redisService: RedisService
  ) {}

  @Get('test-redis')
  async testRedis() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.redisService.setKey('test_key', 'Hello Redis');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const value = await this.redisService.getKey('test_key');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { message: 'Redis test', value };
  }
}
