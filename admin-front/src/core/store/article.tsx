/** @format */

import { createContainer } from 'unstated-next';
import useCurd from '../../shared/hooks/useCurd';
import { addArticleAsync, deleteArticleAsync, findArticlesAsync, updateArticleAsync } from '../services/article';
import { ArticleBase } from '../types/article';

const sortName = 'article';

const useArticles = () => {
    const {
        dataSource,
        sortIds,
        editId,
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

    return {
        articlesData: dataSource,
        articlesSortIds: sortIds,
        editId,
        startAdd,
        startUpdate,
        endEdit,
        findArticles: findDataSource,
        addArticle: addData,
        updateArticle: updateData,
        deleteArticle: deleteData,
    };
};

const ArticlesContainer = createContainer(useArticles);

export default ArticlesContainer;
