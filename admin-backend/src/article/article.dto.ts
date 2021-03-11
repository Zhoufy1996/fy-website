import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ArticleStatus } from './article.entity';

class Article {
  @Length(0, 20)
  title: string;

  @Length(0, 20)
  subTitle: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(ArticleStatus)
  status: ArticleStatus;

  @MaxLength(20, {
    each: true,
  })
  keywords: string[];
}

export class AddDto extends Article {}
export class UpdateDto extends Article {
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
