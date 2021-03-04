import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { Repository } from 'typeorm';
import { AddProps, DeleteProps, SaveProps, UpdateProps } from './shortNote';
import { ShortNote } from './shortNote.entity';

@Injectable()
export class ShortNoteService {
  constructor(
    @InjectRepository(ShortNote)
    private readonly shortNodeRepository: Repository<ShortNote>,
  ) {}

  async getAll() {
    return this.shortNodeRepository.find();
  }

  async getOne({ id }: { id: number }) {
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
    const shortNote = new ShortNote();
    shortNote.title = data.title;
    shortNote.content = data.content;
    shortNote.keywords = data.keywords;

    if (data.id) {
      shortNote.id = data.id;
    }

    return this.shortNodeRepository.save(shortNote);
  }
}
