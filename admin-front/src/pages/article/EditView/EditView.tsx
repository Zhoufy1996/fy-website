/** @format */
import { Button, Menu, message, Typography } from 'antd';
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
import { DataBase } from '../../../core/types/common';

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

const getTitle = (content: string) => {
    const pattern = /(#+)(.+)/.exec(content);
    return (pattern && pattern[2] && pattern[2].trim()) || '';
};

const getKeywords = (content: string) => {
    const pattern = /(keywords: )(.+)/.exec(content);
    return (pattern && pattern[2] && pattern[2].split(' ')) || [];
};

const handleContentToArticle = (content: string, status: ArticleStatus): ArticleBase => {
    return {
        title: getTitle(content),
        subTitle: '',
        content,
        keywords: getKeywords(content),
        status,
    };
};

enum MenuItemKey {
    IMPORT = 'import',
    EXPORT = 'export ',
    SYNC = 'sync',
    DRAFT = 'draft',
    PUBLISH = 'publish',
}

const EditView: React.FC<ReadViewProps> = () => {
    const { articlesData, addArticle, updateArticle, articleId } = ArticlesContainer.useContainer();
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

    const save = useCallback(
        async (status: ArticleStatus) => {
            let res: ArticleBase & DataBase;
            if (articleId === 0) {
                res = await addArticle(handleContentToArticle(article.content, status));
            } else {
                res = await updateArticle({
                    id: articleId,
                    ...handleContentToArticle(article.content, status),
                });
            }
            setArticle(res);
            message.success('操作成功');
            if (res.id !== articleId) {
                history.push(`/article/${res.id}`);
            }
        },
        [articleId, article, history, addArticle, updateArticle]
    );

    // 同步
    const [isSync, setSync] = useState<boolean>(false);

    const syncSave = useCallback(async () => {
        if (isSync) {
            try {
                await save(ArticleStatus.DRAFT);
            } catch (e) {
                setSync(false);
            }
        }
    }, [isSync, save]);

    useSyncData({ delay: 1000, callback: syncSave });

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, minHeight: 0 }}>
                <EditMarkdown key={articleId} value={article.content} onChange={setContent} />
            </div>
            <SettingBtn
                overlay={
                    <Menu
                        style={{ width: 200, textAlign: 'center' }}
                        onClick={async ({ key }: { key: React.Key }) => {
                            const itemKey = key as MenuItemKey;
                            if (itemKey === MenuItemKey.SYNC) {
                                setSync((pre) => !pre);
                            }

                            if (itemKey === MenuItemKey.IMPORT) {
                                selectFile({
                                    accept: ['.md'],
                                }).then((res) => {
                                    setContent(res[0]);
                                });
                            }

                            if (itemKey === MenuItemKey.EXPORT) {
                                exportFile({
                                    fileContent: article.content,
                                    type: 'md',
                                    name: article.title || ' ',
                                });
                            }

                            if (itemKey === MenuItemKey.DRAFT) {
                                await save(ArticleStatus.DRAFT);
                            }

                            if (itemKey === MenuItemKey.PUBLISH) {
                                await save(ArticleStatus.PUBLISHED);
                            }
                        }}
                    >
                        <Menu.Item style={{ cursor: 'text' }}>
                            <Typography.Text type="warning">
                                {article.status === ArticleStatus.DRAFT ? '草稿' : '已发布'}
                            </Typography.Text>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key={MenuItemKey.IMPORT}>导入</Menu.Item>
                        <Menu.Item key={MenuItemKey.EXPORT}>导出</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key={MenuItemKey.SYNC}>
                            <Button disabled={articleId === 0} shape="circle" type={isSync ? 'primary' : 'default'}>
                                <CloudUploadOutlined />
                            </Button>
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key={MenuItemKey.DRAFT}>存为草稿</Menu.Item>
                        <Menu.Item key={MenuItemKey.PUBLISH}>发布</Menu.Item>
                    </Menu>
                }
            />
        </div>
    );
};

export default EditView;
