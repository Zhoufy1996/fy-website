/** @format */
import React from 'react';
import ArticlesContainer from '../../../core/store/article';
import EditView from '../EditView/EditView';
import ReadView from '../ReadView/ReadView';

const ArticleView = () => {
    const { editId } = ArticlesContainer.useContainer();

    return editId == null ? <ReadView /> : <EditView />;
};

export default ArticleView;
