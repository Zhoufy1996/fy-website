import { IsDate, IsInt, IsString, Max, Min } from 'class-validator';

class Task {
  @IsDate()
  beginTime: Date;

  @IsDate()
  endTime: Date;

  @IsInt()
  award: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  @Min(0)
  @Max(100)
  progress: number;
}

export class AddDto extends Task {}
export class UpdateDto extends Task {
  @IsInt()
  id: number;
}
export class DeleteDto {
  @IsInt()
  id: number;
}

export class FindDto {
  // @IsString()
  // keyword: string;
  // @IsOptional()
  // @IsEnum(ArticleStatus)
  // status: ArticleStatus;
}

export class FindOneDto {
  @IsInt()
  id: number;
}
