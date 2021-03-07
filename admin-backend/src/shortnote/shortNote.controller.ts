import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SortService } from 'src/sort/sort.service';
import {
  AddDto,
  DeleteDto,
  FindDto,
  FindOneDto,
  UpdateDto,
} from './shortNote.dto';
import { ShortNoteService } from './shortNote.service';

const sortName = 'shortNote';
@UseGuards(AuthGuard('jwt'))
@Controller('shortNote')
export class ShortNoteController {
  constructor(
    private readonly shortNoteService: ShortNoteService,
    private sortServie: SortService,
  ) {}

  @Post('find')
  async getAll(@Body() body: FindDto) {
    return this.shortNoteService.find(body);
  }

  @Post('findOne')
  async getOne(@Body() body: FindOneDto) {
    return this.shortNoteService.findOne(body);
  }

  @Post('add')
  async add(@Body() body: AddDto) {
    const sortNote = await this.shortNoteService.add(body);
    await this.sortServie.addOneSortId({ name: sortName, id: sortNote.id });
    return sortNote;
  }

  @Post('update')
  async update(@Body() body: UpdateDto) {
    return this.shortNoteService.update(body);
  }

  @Post('delete')
  async deelte(@Body() body: DeleteDto) {
    await this.shortNoteService.delete(body);
    await this.sortServie.deleteOneSortId({
      name: sortName,
      id: body.id,
    });
    return;
  }
}
