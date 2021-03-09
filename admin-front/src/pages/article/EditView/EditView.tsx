/** @format */
import { Button, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { ArticleStatus } from '../../../core/constant/article';
import ArticlesContainer from '../../../core/store/article';
import { ArticleBase } from '../../../core/types/article';
import EditMarkdown from '../../../shared/components/Markdown/Edit';

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

    return (
        <div>
            <Input
                value={article.title}
                onChange={(e) => {
                    setArticle((pre) => {
                        return {
                            ...pre,
                            title: e.target.value,
                        };
                    });
                }}
            />
            <Input
                value={article.subTitle}
                onChange={(e) => {
                    setArticle((pre) => {
                        return {
                            ...pre,
                            subTitle: e.target.value,
                        };
                    });
                }}
            />
            <Input
                value={article.keywords.join(' ')}
                onChange={(e) => {
                    setArticle((pre) => {
                        return {
                            ...pre,
                            keywords: e.target.value.split(' '),
                        };
                    });
                }}
            />
            <div>{article.status === ArticleStatus.DRAFT ? '草稿' : '已发布'}</div>
            <Button>存为草稿</Button>
            <Button>发布</Button>
            <EditMarkdown defaultValue={article?.content} onChange={setContent} />
        </div>
    );
};

export default EditView;
