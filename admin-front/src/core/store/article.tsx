/** @format */

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createContainer } from 'unstated-next';
import useCurd from '../../shared/hooks/useCurd';
import { addArticleAsync, deleteArticleAsync, findArticlesAsync, updateArticleAsync } from '../services/article';
import { ArticleBase } from '../types/article';

const sortName = 'article';

const useArticles = () => {
    const {
        dataSource,
        sortIds,
        startAdd,
        startUpdate,
        endEdit,
        findDataSource,
        addData,
        updateData,
        deleteData,
    } = useCurd<ArticleBase>({
        findAllAsync: findArticlesAsync,
        addAsync: addArticleAsync,
        updateAsync: updateArticleAsync,
        deleteAsync: deleteArticleAsync,
        sortName,
    });

    const [mode, setMode] = useState<'read' | 'edit'>('read');

    const { pathname } = useLocation();

    const articleId = Number(pathname.split('/').pop());
    return {
        articlesData: dataSource,
        articlesSortIds: sortIds,
        startAdd,
        startUpdate,
        endEdit,
        findArticles: findDataSource,
        addArticle: addData,
        updateArticle: updateData,
        deleteArticle: deleteData,
        setMode,
        mode,

        articleId,
    };
};

const ArticlesContainer = createContainer(useArticles);

export default ArticlesContainer;
