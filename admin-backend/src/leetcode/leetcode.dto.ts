import { IsEnum, IsInt, IsString } from 'class-validator';
import { QuestionStatus, CodeLanguage } from './leetcode.entity';
export class SaveLeetcodeDto {
  @IsInt()
  id: number;

  @IsEnum(QuestionStatus)
  status: QuestionStatus;

  @IsString()
  alalysis: string;

  @IsEnum(CodeLanguage)
  language: CodeLanguage;

  @IsString()
  description: string;

  @IsString({
    each: true,
  })
  codes: string[];
}

export class ResetDto {
  @IsInt()
  id: number;
}
