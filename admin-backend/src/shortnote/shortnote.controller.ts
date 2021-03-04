import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SortService } from 'src/sort/sort.service';
import { AddDto, DeleteDto, GetOneDto, UpdateDto } from './shortNote.dto';
import { ShortNoteService } from './shortNote.service';

const sortName = 'sortNote';
@UseGuards(AuthGuard('jwt'))
@Controller('shortNote')
export class ShortNoteController {
  constructor(
    private readonly shortNoteService: ShortNoteService,
    private sortServie: SortService,
  ) {}

  @Post('getAll')
  async getAll() {
    return this.shortNoteService.getAll();
  }

  @Post('getOne')
  async getOne(@Body() body: GetOneDto) {
    return this.shortNoteService.getOne(body);
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
    this.sortServie.deleteOneSortId({
      name: sortName,
      id: body.id,
    });
    return;
  }
}
