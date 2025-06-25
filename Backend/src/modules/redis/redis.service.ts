import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setKey(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async getKey(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async deleteKey(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async keys(pattern: string = '*'): Promise<string[]> {
    return this.redis.keys(pattern);
  }
}
