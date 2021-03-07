/** @format */

import { AddSortNoteProps, ShortNote, GetShortNoteProps, UpdateSortNoteProps } from '../types/shortNote';
import service from './base';

export const getShortNotesDataAsync = (): Promise<ShortNote[]> => {
    return service.post('shortNote/find');
};

export const getShortNoteByIdAsync = (value: GetShortNoteProps): Promise<ShortNote> => {
    return service.post('shortNote/findOne', value);
};

export const addShortNoteAsync = (value: AddSortNoteProps): Promise<ShortNote> => {
    return service.post('shortNote/add', value);
};

export const updateShortNoteAsync = (value: UpdateSortNoteProps): Promise<ShortNote> => {
    return service.post('shortNote/update', value);
};

export const deleteShortNoteAsync = (id: number): Promise<void> => {
    return service.post('shortNote/delete', { id });
};
