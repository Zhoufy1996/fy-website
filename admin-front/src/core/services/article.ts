/** @format */

import {
    FindArticlesAsyncFunc,
    FindOneArticleAsyncFunc,
    AddArticleAsyncFunc,
    UpdateArticleAsyncFunc,
    DeleteArticleAsyncFunc,
} from '../types/article';
import service from './base';

const controllerName = 'article';

export const findArticlesAsync: FindArticlesAsyncFunc = (value) => {
    return service.post(`${controllerName}/find`, value);
};

export const findArticleByIdAsync: FindOneArticleAsyncFunc = (value) => {
    return service.post(`${controllerName}/findOne`, value);
};

export const addArticleAsync: AddArticleAsyncFunc = (value) => {
    return service.post(`${controllerName}/add`, value);
};

export const updateArticleAsync: UpdateArticleAsyncFunc = (value) => {
    return service.post(`${controllerName}/update`, value);
};

export const deleteArticleAsync: DeleteArticleAsyncFunc = (value) => {
    return service.post(`${controllerName}/delete`, value);
};
