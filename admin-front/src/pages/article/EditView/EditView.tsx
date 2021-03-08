/** @format */
import React, { useCallback, useEffect, useState } from 'react';
import EditMarkdown from '../../../core/components/markdown/Edit';
import { ArticleStatus } from '../../../core/constant/article';
import ArticlesContainer from '../../../core/store/article';
import { ArticleBase } from '../../../core/types/article';

interface ReadViewProps {}

const getInitArticle = (): ArticleBase => {
    return {
        title: '',
        subTitle: '',
        content: '',
        keywords: [],
        status: ArticleStatus.DRAFT,
    };
};

const EditView: React.FC<ReadViewProps> = () => {
    const { editId, articlesData } = ArticlesContainer.useContainer();

    const [article, setArticle] = useState<ArticleBase>(getInitArticle());

    useEffect(() => {
        if (editId === -1) {
            setArticle(getInitArticle());
            return;
        }

        const data = articlesData[editId as number];

        setArticle(data || getInitArticle());
    }, [editId, articlesData]);

    const setContent = useCallback((value: string) => {
        setArticle((pre) => {
            return {
                ...pre,
                content: value,
            };
        });
    }, []);

    return <EditMarkdown defaultValue={article?.content} onChange={setContent} />;
};

export default EditView;
