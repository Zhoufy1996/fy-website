import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity } from 'typeorm';

export enum Level {
  SIMPLE = 'simple',
  MEDIUM = 'medium',
  DIFFICULTY = 'difficulty',
}

export enum QuestionStatus {
  UNDONE = 'undone',
  DONE = 'done',
}

export enum CodeLanguage {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
}

@Entity({ name: 'leetcode' })
export class LeetcodeEntity extends BaseEntity {
  @Column({
    name: 'question_id',
  })
  questionId: number;

  @Column({
    length: 300,
  })
  title: string;

  @Column({
    length: 300,
    name: 'title_slug',
  })
  titleSlug: string;

  @Column({
    type: 'enum',
    enum: Level,
  })
  level: Level;

  @Column({
    name: 'question_content',
    type: 'longtext',
    nullable: true,
  })
  questionContent: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  tags: string[];

  @Column({
    type: 'enum',
    enum: QuestionStatus,
    default: QuestionStatus.UNDONE,
  })
  status: QuestionStatus;

  @Column({
    default: '',
  })
  alalysis: string;

  @Column({
    type: 'enum',
    enum: CodeLanguage,
    default: CodeLanguage.TYPESCRIPT,
  })
  language: CodeLanguage;

  @Column({
    default: '',
  })
  description: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  codes: string[];
}
