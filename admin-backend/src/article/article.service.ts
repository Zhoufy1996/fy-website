import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import {
  AddProps,
  SaveProps,
  UpdateProps,
  DeleteProps,
  FindProps,
  FindOneProps,
} from './article.type';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async find({}: FindProps) {
    return this.articleRepository.find();
  }

  async findOne({ id }: FindOneProps) {
    return this.articleRepository.findOne({
      id,
    });
  }

  async add(article: AddProps) {
    return this.save(article);
  }

  async update(article: UpdateProps) {
    return this.save(article);
  }

  async delete({ id }: DeleteProps) {
    return this.articleRepository.delete({ id });
  }

  async save({ id, title, subTitle, content, status, keywords }: SaveProps) {
    const article = new ArticleEntity();
    article.title = title;
    article.subTitle = subTitle;
    article.content = content;
    article.status = status;
    article.keywords = keywords;
    if (id) {
      article.id = id;
    }
    return this.articleRepository.save(article);
  }
}
