/** @format */
import React from 'react';
import ArticlesContainer from '../../../core/store/article';
import EditView from '../EditView/EditView';
import ReadView from '../ReadView/ReadView';

const ArticleView = () => {
    const { mode, articleId } = ArticlesContainer.useContainer();

    return (
        <div style={{ flexGrow: 1, flexShrink: 1, marginLeft: 16, display: 'flex' }}>
            {mode === 'read' ? <ReadView key={articleId} /> : <EditView key={articleId} />}
        </div>
    );
};

export default ArticleView;
