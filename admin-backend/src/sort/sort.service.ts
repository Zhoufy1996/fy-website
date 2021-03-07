import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode, MyHttpException } from 'src/core/exception';
import { Repository } from 'typeorm';
import { SortEntity } from './sort.entity';
import {
  AddOneSortId,
  DeleteOneSortId,
  GetOneProps,
  SaveProps,
  UpdateProps,
} from './sort.type';
@Injectable()
export class SortService {
  constructor(
    @InjectRepository(SortEntity)
    private readonly sortRepository: Repository<SortEntity>,
  ) {}

  async findOne(data: GetOneProps) {
    const sortIds = await this.sortRepository.findOne({ name: data.name });
    return sortIds;
  }

  async add(name: string, content: number[]) {
    const sort = new SortEntity();
    sort.name = name;
    sort.content = content;
    return this.sortRepository.save(sort);
  }

  async update({ name = '', content = [] }: UpdateProps) {
    const oldSort = await this.findOne({ name });
    if (oldSort) {
      return this.save({
        id: oldSort.id,
        name: oldSort.name,
        content,
      });
    } else {
      throw new MyHttpException(ErrorCode.sortError);
    }
  }

  async addOneSortId(data: AddOneSortId) {
    const sortIds = await this.findOne({ name: data.name });
    if (sortIds == null) {
      return this.save({
        name: data.name,
        content: [data.id],
      });
    }
    sortIds.content = [...sortIds.content, data.id];
    return this.save(sortIds);
  }

  async deleteOneSortId(data: DeleteOneSortId) {
    const sortIds = await this.findOne({ name: data.name });

    sortIds.content = sortIds.content.filter((id) => Number(id) !== data.id);
    return this.save(sortIds);
  }

  async save(data: SaveProps) {
    const sortIds = new SortEntity();
    sortIds.content = data.content;
    sortIds.name = data.name;
    if (data.id) {
      sortIds.id = data.id;
    }
    return this.sortRepository.save(data);
  }
}
