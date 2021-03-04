import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyHttpException } from 'src/core/exception';
import { Repository } from 'typeorm';
import { SortEntity } from './sort.entity';

@Injectable()
export class SortService {
  constructor(
    @InjectRepository(SortEntity)
    private readonly sortRepository: Repository<SortEntity>,
  ) {}

  async edit({ name = '', content = [] }: { name: string; content: number[] }) {
    const oldSort = await this.sortRepository.findOne({ name });
    const newSort = new SortEntity();
    if (oldSort) {
      newSort.id = oldSort.id;
      newSort.name = oldSort.name;
      newSort.content = content;
      return this.sortRepository.save(newSort);
    } else {
      throw MyHttpException();
    }
  }

  async getone(name: string) {
    const sortIds = await this.sortRepository.findOne({ name });
    if (sortIds) {
      return sortIds.content;
    }
    return [];
  }
}
