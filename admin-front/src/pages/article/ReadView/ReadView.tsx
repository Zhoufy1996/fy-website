/** @format */
import React from 'react';
import ReadMarkdown from '../../../shared/components/Markdown/Read';
import ArticlesContainer from '../../../core/store/article';
import NotFound from '../NotFound/NotFound';

interface ReadViewProps {}

const ReadView: React.FC<ReadViewProps> = () => {
    const { articlesData, articleId } = ArticlesContainer.useContainer();

    const article = articlesData[articleId];
    return article ? (
        <div style={{ flex: 1 }}>
            <ReadMarkdown content={article.content} />
        </div>
    ) : (
        <NotFound />
    );
};

export default ReadView;
