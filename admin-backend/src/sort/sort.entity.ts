import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/shared/entity/base.entity';

@Entity('sort')
export class SortEntity extends BaseEntity {
  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'content',
    type: 'simple-array',
    nullable: true,
  })
  content: number[];
}
