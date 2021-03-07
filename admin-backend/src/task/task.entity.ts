import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'task',
})
export class TaskEntity extends BaseEntity {
  @Column({
    type: 'datetime',
    name: 'begin_time',
  })
  beginTime: Date;

  @Column({
    type: 'datetime',
    name: 'end_time',
  })
  endTime: Date;

  @Column({})
  award: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'varchar',
  })
  content: string;
}
