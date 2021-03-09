/** @format */
import React from 'react';
import { useParams } from 'react-router-dom';
import ReadMarkdown from '../../../shared/components/Markdown/Read';
import ArticlesContainer from '../../../core/store/article';
import NotFound from '../NotFound/NotFound';

interface ReadViewProps {}

const ReadView: React.FC<ReadViewProps> = () => {
    const params = useParams<{ id: string }>();
    const { articlesData } = ArticlesContainer.useContainer();

    const article = articlesData[Number(params.id)];

    return article ? (
        <div style={{ flex: 1 }}>
            <ReadMarkdown content={article.content} />
        </div>
    ) : (
        <NotFound />
    );
};

export default ReadView;
