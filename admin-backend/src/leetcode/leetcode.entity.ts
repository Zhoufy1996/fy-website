import { BaseEntity } from 'src/shared/entity/base.entity';
import { Column, Entity } from 'typeorm';

enum Level {
  SIMPLE = 'simple',
  MEDIUM = 'medium',
  DIFFICULTY = 'difficulty',
}

enum QuestionStatus {
  UNDONE = 'undone',
  DONE = 'done',
}

enum CodeLanguage {
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
    type: 'enum',
    enum: Level,
  })
  level: Level;

  @Column({
    name: 'question_content',
  })
  questionContent: string;

  @Column({
    type: 'simple-array',
  })
  tags: string[];

  @Column({
    type: 'enum',
    enum: QuestionStatus,
    default: QuestionStatus.UNDONE,
  })
  status: QuestionStatus;

  @Column()
  alalysis: string;

  @Column({
    type: 'enum',
    enum: CodeLanguage,
    default: CodeLanguage.TYPESCRIPT,
  })
  language: CodeLanguage;

  @Column()
  codes: string[];

  @Column()
  description: string;
}
