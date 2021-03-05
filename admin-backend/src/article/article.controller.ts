import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SortService } from 'src/sort/sort.service';
import {
  AddDto,
  DeleteDto,
  FindDto,
  FindOneDto,
  UpdateDto,
} from './article.dto';
import { ArticleService } from './article.service';

const sortName = 'article';

@UseGuards(AuthGuard('jwt'))
@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly sortService: SortService,
  ) {}

  @Post('find')
  async find(@Body() body: FindDto) {
    return this.articleService.find(body);
  }

  @Post('findOne')
  async findOne(@Body() body: FindOneDto) {
    return this.articleService.findOne(body);
  }

  @Post('add')
  async add(@Body() body: AddDto) {
    const article = await this.articleService.add(body);
    await this.sortService.addOneSortId({ name: sortName, id: article.id });
    return article;
  }

  @Post('update')
  async update(@Body() body: UpdateDto) {
    return this.articleService.update(body);
  }

  @Post('delete')
  async delete(@Body() body: DeleteDto) {
    await this.articleService.delete(body);
    await this.sortService.addOneSortId({ name: sortName, id: body.id });
    return;
  }
}
