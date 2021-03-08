/** @format */

export type SortIds = number[];

export interface DataBase {
    id: number;
    createdAt: string;
    updatedAt: string;
}

export interface DataSource<T extends DataBase> {
    [key: number]: T;
}

export interface FindAllFunc<T extends DataBase> {
    ({ key: string }: any): Promise<T[]>;
}

export interface FindOneFunc<T> {
    (value: { id: number }): Promise<T>;
}

export interface AddFunc<T, U = T & DataBase> {
    (value: T): Promise<U>;
}

export interface UpdateFunc<T extends { id: number }, U = T & DataBase> {
    (value: T): Promise<U>;
}

export interface DeleteFunc {
    (value: { id: number }): Promise<void>;
}
