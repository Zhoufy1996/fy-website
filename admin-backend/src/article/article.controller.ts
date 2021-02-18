import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateArticleDto,
  DeleteArticleDto,
  FindArticleDto,
  UpdateArticleDto,
} from './article.dto';
import { ArticleService } from './article.service';

@UseGuards(AuthGuard('jwt'))
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('add')
  async createArticle(@Body() body: CreateArticleDto) {
    return this.articleService.createArticle(body);
  }

  @Post('update')
  async updateArticle(@Body() body: UpdateArticleDto) {
    return this.articleService.updateArticle(body);
  }

  @Post('delete')
  async deleteArticle(@Body() body: DeleteArticleDto) {
    return this.articleService.deleteArticle(body.id);
  }

  @Post('find')
  async findArticle(@Body() body: FindArticleDto) {
    return this.articleService.findArticle(body);
  }
}
