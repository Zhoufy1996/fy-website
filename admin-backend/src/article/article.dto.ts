import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ArticleStatus } from './article.entity';

class Article {
  @Length(2, 20)
  title: string;

  @Length(2, 20)
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

export class CreateArticleDto extends Article {}
export class UpdateArticleDto extends Article {
  @IsNumber()
  id: number;
}
export class DeleteArticleDto {
  @IsNumber()
  id: number;
}

enum FindArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ALL = 'all',
}

export class FindArticleDto {
  @IsString()
  keyword: string;

  @IsOptional()
  @IsEnum(ArticleStatus)
  status: ArticleStatus;
}
