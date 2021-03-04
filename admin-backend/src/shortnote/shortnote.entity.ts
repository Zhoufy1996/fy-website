import { BaseEntity } from 'src/shared/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('shortnote')
export class ShortNote extends BaseEntity {
  @Column({
    name: 'title',
  })
  title: string;

  @Column({
    name: 'content',
  })
  content: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  keywords: string[];
}
