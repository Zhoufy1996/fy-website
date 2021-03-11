import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import {
  AddProps,
  SaveProps,
  UpdateProps,
  DeleteProps,
  FindProps,
  FindOneProps,
} from './task.type';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async find({}: FindProps) {
    return this.taskRepository.find();
  }

  async findOne({ id }: FindOneProps) {
    return this.taskRepository.findOne({
      id,
    });
  }

  async add(article: AddProps) {
    return this.save(article);
  }

  async update(article: UpdateProps) {
    return this.save(article);
  }

  async delete({ id }: DeleteProps) {
    return this.taskRepository.delete({ id });
  }

  async save({
    id,
    title,
    beginTime,
    endTime,
    award,
    content,
    progress,
  }: SaveProps) {
    const task = new TaskEntity();
    task.title = title;
    task.beginTime = beginTime;
    task.endTime = endTime;
    task.award = award;
    task.content = content;
    task.progress = progress;
    if (id) {
      task.id = id;
    }
    return this.taskRepository.save(task);
  }
}
