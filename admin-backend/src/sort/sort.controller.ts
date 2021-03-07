import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDto, GetOneDto } from './sort.dto';
import { SortService } from './sort.service';

@UseGuards(AuthGuard('jwt'))
@Controller('sort')
export class SortController {
  constructor(private readonly sortService: SortService) {}

  @Post('find')
  async findOne(@Body() body: GetOneDto) {
    const sort = await this.sortService.findOne(body);
    if (sort) {
      return sort.content.map((id) => Number(id));
    }
    return [];
  }

  @Post('update')
  async update(@Body() body: UpdateDto) {
    return this.sortService.update(body);
  }
}
