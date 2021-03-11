/** @format */
import { Button, Menu, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CloudUploadOutlined } from '@ant-design/icons';
import { ArticleStatus } from '../../../core/constant/article';
import ArticlesContainer from '../../../core/store/article';
import { ArticleBase } from '../../../core/types/article';
import EditMarkdown from '../../../shared/components/Markdown/Edit';
import { exportFile, selectFile } from '../../../shared/utils/file';
import SettingBtn from '../../../shared/components/SettingBtn/SettingBtn';

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
    const { editId, articlesData, addArticle, updateArticle, startUpdate } = ArticlesContainer.useContainer();

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

    const [isSync, setSync] = useState<boolean>(false);

    const saveDraft = useCallback(async () => {
        if (editId === -1) {
            return addArticle({
                ...article,
                status: ArticleStatus.DRAFT,
            });
        }
        return updateArticle({
            ...article,
            id: editId as number,
            status: ArticleStatus.DRAFT,
        });
    }, [article, editId, addArticle, updateArticle]);

    const publish = useCallback(async () => {
        if (editId === -1) {
            return addArticle({
                ...article,
                status: ArticleStatus.DRAFT,
            });
        }
        return updateArticle({
            ...article,
            id: editId as number,
            status: ArticleStatus.DRAFT,
        });
    }, [article, editId, addArticle, updateArticle]);

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

    const [nextSyncTime, setNextSyncTime] = useState<Dayjs>(dayjs());

    useEffect(() => {
        const save = async () => {
            if (isSync) {
                if (dayjs().isAfter(nextSyncTime)) {
                    const res = await saveDraft();

                    setNextSyncTime(dayjs().add(2, 'minute'));
                    startUpdate(res.id);
                }
            }
        };
        save();
    }, [isSync, nextSyncTime, saveDraft, startUpdate]);

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, minHeight: 0 }}>
                <EditMarkdown key="edit" value={article.content} onChange={setContent} />
            </div>
            <SettingBtn
                overlay={
                    <Menu
                        style={{ width: 200, textAlign: 'center' }}
                        onClick={({ key }) => {
                            if (key === 'sync') {
                                setSync((pre) => !pre);
                                setNextSyncTime(dayjs().add(2, 'minute'));
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
                                saveDraft();
                            }

                            if (key === 'publish') {
                                publish();
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
                            <Button shape="circle" type={isSync ? 'primary' : 'default'}>
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
