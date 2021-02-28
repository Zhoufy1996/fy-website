import { BaseEntity } from 'src/shared/entity/base.entity';
import { Entity } from 'typeorm';

@Entity({
  name: 'task',
})
export class TaskEntity extends BaseEntity {}
