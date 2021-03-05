import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity({ name: 'article' })
export class ArticleEntity extends BaseEntity {
  @Column({
    length: 50,
  })
  title: string;

  @Column({
    name: 'sub_title',
    length: 50,
  })
  subTitle: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.DRAFT,
  })
  status: ArticleStatus;

  @Column({
    type: 'simple-array',
  })
  keywords: string[];
}
