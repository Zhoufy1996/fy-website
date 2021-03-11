/** @format */
import { Button, Menu, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ArticleStatus } from '../../../core/constant/article';
import ArticlesContainer from '../../../core/store/article';
import { ArticleBase } from '../../../core/types/article';
import EditMarkdown from '../../../shared/components/Markdown/Edit';
import { exportFile, selectFile } from '../../../shared/utils/file';
import SettingBtn from '../../../shared/components/SettingBtn/SettingBtn';
import useSyncData from '../../../shared/hooks/useSyncData';

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
    const { articlesData, addArticle, updateArticle, startUpdate, articleId } = ArticlesContainer.useContainer();
    const [article, setArticle] = useState<ArticleBase>(getInitArticle());
    const history = useHistory();

    useEffect(() => {
        const art = articlesData[articleId];
        setArticle(art || getInitArticle());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [articleId]);

    const setContent = useCallback((value: string) => {
        setArticle((pre) => {
            return {
                ...pre,
                content: value,
            };
        });
    }, []);

    const saveDraft = useCallback(async () => {
        if (articleId === 0) {
            return addArticle({
                ...article,
                status: ArticleStatus.DRAFT,
            });
        }
        return updateArticle({
            ...article,
            id: articleId as number,
            status: ArticleStatus.DRAFT,
        });
    }, [article, articleId, addArticle, updateArticle]);

    const publish = useCallback(async () => {
        if (articleId === 0) {
            return addArticle({
                ...article,
                status: ArticleStatus.PUBLISHED,
            });
        }
        return updateArticle({
            ...article,
            id: articleId as number,
            status: ArticleStatus.PUBLISHED,
        });
    }, [article, articleId, addArticle, updateArticle]);

    // 同步
    const [isSync, setSync] = useState<boolean>(false);

    const syncSave = useCallback(async () => {
        if (isSync) {
            try {
                const res = await saveDraft();

                startUpdate(res.id);
                if (res.id !== articleId) {
                    history.push(`/article/${res.id}`);
                }
            } catch (e) {
                setSync(false);
            }
        }
    }, [isSync, saveDraft, startUpdate, history, articleId]);

    useSyncData({ delay: 1000, callback: syncSave });

    // 提取标题和关键词
    useEffect(() => {
        const title = /(#+)(.+)/.exec(article.content);
        const keywords = /(keywords: )(.+)/.exec(article.content);
        setArticle((pre) => {
            return {
                ...pre,
                title: (title && title[2] && title[2].trim()) || '',
                keywords: (keywords && keywords[2] && keywords[2].split(' ')) || [],
            };
        });
    }, [article.content]);

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, minHeight: 0 }}>
                <EditMarkdown key={articleId} value={article.content} onChange={setContent} />
            </div>
            <SettingBtn
                overlay={
                    <Menu
                        style={{ width: 200, textAlign: 'center' }}
                        onClick={async ({ key }) => {
                            if (key === 'sync') {
                                setSync((pre) => !pre);
                            }

                            if (key === 'import') {
                                selectFile({
                                    accept: ['.md'],
                                }).then((res) => {
                                    setContent(res[0]);
                                });
                            }

                            if (key === 'export') {
                                exportFile({
                                    fileContent: article.content,
                                    type: 'md',
                                    name: article.title || ' ',
                                });
                            }

                            if (key === 'draft') {
                                const res = await saveDraft();
                                setArticle(res);
                                history.push(`/article/${res.id}`);
                            }

                            if (key === 'publish') {
                                const res = await publish();
                                setArticle(res);
                                history.push(`/article/${res.id}`);
                            }
                        }}
                    >
                        <Menu.Item style={{ cursor: 'text' }}>
                            <Typography.Text type="warning">
                                {article.status === ArticleStatus.DRAFT ? '草稿' : '已发布'}
                            </Typography.Text>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="import">导入</Menu.Item>
                        <Menu.Item key="export">导出</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="sync">
                            <Button disabled={articleId === 0} shape="circle" type={isSync ? 'primary' : 'default'}>
                                <CloudUploadOutlined />
                            </Button>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="draft">存为草稿</Menu.Item>
                        <Menu.Item key="publish">发布</Menu.Item>
                    </Menu>
                }
            />
        </div>
    );
};

export default EditView;
