import { IsEnum, IsNumber, IsString } from 'class-validator';
import { QuestionStatus, CodeLanguage } from './leetcode.entity';
export class SaveLeetcodeDto {
  @IsNumber()
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
  @IsNumber()
  id: number;
}
