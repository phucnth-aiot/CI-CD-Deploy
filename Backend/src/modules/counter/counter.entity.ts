import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('counter')
export class Counter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  value: number;
}
