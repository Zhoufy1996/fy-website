/** @format */

import { AddFunc, DataBase, DataSource, DeleteFunc, FindAllFunc, FindOneFunc, UpdateFunc } from './common';

/** @format */
enum ArticleStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
}

export interface ArticleBase {
    title: string;
    subTitle: string;
    content: string;
    status: ArticleStatus;
    keywords: string[];
}

export type Article = ArticleBase & DataBase;

export type Articles = DataSource<Article>;

export type FindArticlesAsyncFunc = FindAllFunc<Article>;

export type FindOneArticleAsyncFunc = FindOneFunc<Article>;

export type AddArticleAsyncFunc = AddFunc<ArticleBase>;

export type UpdateArticleAsyncFunc = UpdateFunc<ArticleBase>;

export type DeleteArticleAsyncFunc = DeleteFunc;
