import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('api/redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('keys')
  async listKeys(): Promise<string[]> {
    return this.redisService.keys();
  }

  @Get('keys/:key')
  async getValue(@Param('key') key: string): Promise<string | null> {
    return this.redisService.getKey(key);
  }

  @Post()
  async setValue(
    @Body() body: { key: string; value: string }
  ): Promise<{ status: string }> {
    await this.redisService.setKey(body.key, body.value);
    return { status: 'ok' };
  }

  @Delete('keys/:key')
  async deleteKey(@Param('key') key: string): Promise<{ deleted: number }> {
    const deleted = await this.redisService.deleteKey(key);
    return { deleted };
  }
}
