/** @format */

import {
    UpdateShortNoteAsyncFunc,
    DeleteShortNoteAsyncFunc,
    FindShortNotesAsyncFunc,
    FindOneShortNoteAsyncFunc,
    AddShortNoteAsyncFunc,
} from '../types/shortNote';
import service from './base';

const controllerName = 'shortNote';

export const findShortNotesAsync: FindShortNotesAsyncFunc = (value) => {
    return service.post(`${controllerName}/find`, value);
};

export const findShortNoteByIdAsync: FindOneShortNoteAsyncFunc = (value) => {
    return service.post(`${controllerName}/findOne`, value);
};

export const addShortNoteAsync: AddShortNoteAsyncFunc = (value) => {
    return service.post(`${controllerName}/add`, value);
};

export const updateShortNoteAsync: UpdateShortNoteAsyncFunc = (value) => {
    return service.post(`${controllerName}/update`, value);
};

export const deleteShortNoteAsync: DeleteShortNoteAsyncFunc = (value) => {
    return service.post(`${controllerName}/delete`, value);
};
