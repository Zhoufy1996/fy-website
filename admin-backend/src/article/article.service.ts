import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateArticleDto,
  FindArticleDto,
  UpdateArticleDto,
} from './article.dto';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async createArticle(art: CreateArticleDto) {
    const article = new ArticleEntity();
    article.title = art.title;
    article.subTitle = art.subTitle;
    article.content = art.content;
    article.status = art.status;
    article.keywords = art.keywords;
    return this.createOrUpdateArticle(article);
  }

  async updateArticle(art: UpdateArticleDto) {
    const article = new ArticleEntity();
    article.id = art.id;

    article.title = art.title;
    article.subTitle = art.subTitle;
    article.content = art.content;
    article.status = art.status;
    article.keywords = art.keywords;
    return this.createOrUpdateArticle(article);
  }

  async deleteArticle(id: number) {
    return this.articleRepository.delete({ id });
  }

  async findArticle({ keyword, status }: FindArticleDto) {
    return this.articleRepository.createQueryBuilder('article').where({
      status,
    });
  }

  async createOrUpdateArticle(article: ArticleEntity) {
    if (article.id == null) {
      article.createdAt = new Date();
    }
    return this.articleRepository.save(article);
  }
}
