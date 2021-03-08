/** @format */
import React from 'react';
import { useLocation } from 'react-router-dom';
import ArticlesContainer from '../../../core/store/article';
import EditView from '../EditView/EditView';
import NotFound from '../NotFound/NotFound';
import ReadView from '../ReadView/ReadView';

const ArticleView = () => {
    const location = useLocation();
    const { articlesData, editId } = ArticlesContainer.useContainer();
    const locationArr = location.pathname.split('/');
    const articleId = locationArr[locationArr.length - 1];

    const article = articlesData[Number(articleId)];

    return article ? editId == null ? <ReadView /> : <EditView /> : <NotFound />;
};

export default ArticleView;
