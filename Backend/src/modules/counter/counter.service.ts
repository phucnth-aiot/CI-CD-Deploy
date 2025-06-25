import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Counter } from './counter.entity';
import { Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CounterService {
  constructor(
    @InjectRepository(Counter) private counterRepo: Repository<Counter>,
    private redisService: RedisService
  ) {}

  async increment(): Promise<number> {
    let value = await this.redisService.getKey('counter:value');

    if (value === null) {
      let counter = await this.counterRepo.findOne({ where: {} });
      if (!counter) {
        counter = this.counterRepo.create({ value: 0 });
        await this.counterRepo.save(counter);
      }
      value = counter.value.toString();
      await this.redisService.setKey('counter:value', value);
    }

    const newValue = Number(value) + 1;
    await this.redisService.setKey('counter:value', newValue.toString());
    await this.counterRepo.save({ id: 1, value: newValue });

    return newValue;
  }
}
