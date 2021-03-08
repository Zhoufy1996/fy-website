/** @format */

import { AddFunc, DataBase, DataSource, DeleteFunc, FindAllFunc, FindOneFunc, UpdateFunc } from './common';

export interface ShortNoteBase {
    title: string;
    content: string;
    keywords: string[];
}

export type ShortNote = ShortNoteBase & DataBase;

export type ShortNotes = DataSource<ShortNote>;

export type FindShortNotesAsyncFunc = FindAllFunc<ShortNote>;

export type FindOneShortNoteAsyncFunc = FindOneFunc<ShortNote>;

export type AddShortNoteAsyncFunc = AddFunc<ShortNoteBase>;

export type UpdateShortNoteAsyncFunc = UpdateFunc<ShortNoteBase>;

export type DeleteShortNoteAsyncFunc = DeleteFunc;
