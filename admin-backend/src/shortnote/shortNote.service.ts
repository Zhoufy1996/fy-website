import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AddProps,
  DeleteProps,
  SaveProps,
  UpdateProps,
  FindProps,
  FindOneProps,
} from './shortNote.type';
import { ShortNoteEntity } from './shortNote.entity';

@Injectable()
export class ShortNoteService {
  constructor(
    @InjectRepository(ShortNoteEntity)
    private readonly shortNodeRepository: Repository<ShortNoteEntity>,
  ) {}

  async find({}: FindProps) {
    return this.shortNodeRepository.find();
  }

  async findOne({ id }: FindOneProps) {
    return this.shortNodeRepository.findOne({ id });
  }

  async add(data: AddProps) {
    return this.save(data);
  }

  async update(data: UpdateProps) {
    return this.save(data);
  }

  async delete(data: DeleteProps) {
    return await this.shortNodeRepository.delete({
      id: data.id,
    });
  }

  async save(data: SaveProps) {
    const shortNote = new ShortNoteEntity();
    shortNote.title = data.title;
    shortNote.content = data.content;
    shortNote.keywords = data.keywords;

    if (data.id) {
      shortNote.id = data.id;
    }

    return this.shortNodeRepository.save(shortNote);
  }
}
