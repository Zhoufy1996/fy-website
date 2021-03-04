/** @format */

import { AddSortNoteProps, ShortNote, ShortNotes, GetShortNoteProps, UpdateSortNoteProps } from '../types/shortNote';
import service from './base';

export const getShortNotesDataAsync = (): Promise<ShortNotes> => {
    return service.post('shortnote/get');
};

export const getShortNoteByIdAsync = (value: GetShortNoteProps): Promise<ShortNote> => {
    return service.post('shortnote/getone', value);
};

export const addShortNoteAsync = (value: AddSortNoteProps): Promise<void> => {
    return service.post('shortnote/add', value);
};

export const updateShortNoteAsync = (value: UpdateSortNoteProps): Promise<void> => {
    return service.post('shortnote/update', value);
};

export const deleteShortNoteAsync = (): Promise<void> => {
    return service.post('shortnote/delete');
};
