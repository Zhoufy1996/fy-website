import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('shortnote')
export class ShortNoteEntity extends BaseEntity {
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
