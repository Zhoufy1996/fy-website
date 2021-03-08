/** @format */

import {
    FindTasksAsyncFunc,
    FindOneTaskAsyncFunc,
    AddTaskAsyncFunc,
    UpdateTaskAsyncFunc,
    DeleteTaskAsyncFunc,
} from '../types/task';
import service from './base';

const controllerName = 'task';

export const findTasksAsync: FindTasksAsyncFunc = (value) => {
    return service.post(`${controllerName}/find`, value);
};

export const findTaskByIdAsync: FindOneTaskAsyncFunc = (value) => {
    return service.post(`${controllerName}/findOne`, value);
};

export const addTaskAsync: AddTaskAsyncFunc = (value) => {
    return service.post(`${controllerName}/add`, value);
};

export const updateTaskAsync: UpdateTaskAsyncFunc = (value) => {
    return service.post(`${controllerName}/update`, value);
};

export const deleteTaskAsync: DeleteTaskAsyncFunc = (value) => {
    return service.post(`${controllerName}/delete`, value);
};
