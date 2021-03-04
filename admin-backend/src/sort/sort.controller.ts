import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDto, GetOneDto } from './sort.dto';
import { SortService } from './sort.service';

@UseGuards(AuthGuard('jwt'))
@Controller('sort')
export class SortController {
  constructor(private readonly sortService: SortService) {}

  @Post('get')
  async getOne(@Body() body: GetOneDto) {
    return this.sortService.getone(body);
  }

  @Post('update')
  async update(@Body() body: UpdateDto) {
    return this.sortService.update(body);
  }
}
