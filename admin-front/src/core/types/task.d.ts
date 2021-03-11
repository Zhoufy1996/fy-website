/** @format */

import { AddFunc, DataBase, DataSource, DeleteFunc, FindAllFunc, FindOneFunc, UpdateFunc } from './common';

export interface TaskBase {
    award: number;
    title: string;
    content: string;
    beginTime: Date;
    endTime: Date;
    progress: number;
}

export type Task = TaskBase & DataBase;

export type Tasks = DataSource<Task>;

export type FindTasksAsyncFunc = FindAllFunc<Task>;

export type FindOneTaskAsyncFunc = FindOneFunc<Task>;

export type AddTaskAsyncFunc = AddFunc<TaskBase>;

export type UpdateTaskAsyncFunc = UpdateFunc<TaskBase>;

export type DeleteTaskAsyncFunc = DeleteFunc;
