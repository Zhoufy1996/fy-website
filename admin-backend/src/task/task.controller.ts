import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SortService } from 'src/sort/sort.service';
import { AddDto, DeleteDto, FindDto, FindOneDto, UpdateDto } from './task.dto';
import { TaskService } from './task.service';

const sortName = 'TASK';

@UseGuards(AuthGuard('jwt'))
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly sortService: SortService,
  ) {}

  @Post('find')
  async find(@Body() body: FindDto) {
    return this.taskService.find(body);
  }

  @Post('findOne')
  async findOne(@Body() body: FindOneDto) {
    return this.taskService.findOne(body);
  }

  @Post('add')
  async add(@Body() body: AddDto) {
    const article = await this.taskService.add(body);
    await this.sortService.addOneSortId({ name: sortName, id: article.id });
    return article;
  }

  @Post('update')
  async update(@Body() body: UpdateDto) {
    return this.taskService.update(body);
  }

  @Post('delete')
  async delete(@Body() body: DeleteDto) {
    await this.taskService.delete(body);
    await this.sortService.addOneSortId({ name: sortName, id: body.id });
    return;
  }
}
