/** @format */
import { Button, Dropdown, Menu, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { CloudUploadOutlined, SettingOutlined } from '@ant-design/icons';
import { ArticleStatus } from '../../../core/constant/article';
import ArticlesContainer from '../../../core/store/article';
import { ArticleBase } from '../../../core/types/article';
import EditMarkdown from '../../../shared/components/Markdown/Edit';
import useImportFile from '../../../shared/hooks/useImportFile';
import useEditor from '../../../shared/hooks/useEditor';

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

    const [isSync, setSync] = useState<boolean>(false);

    const importFile = useCallback(
        (res: string[]) => {
            setContent(res[0]);
        },
        [setContent]
    );

    const { handleSelectFile, inputEl } = useImportFile({ accept: ['.md'], onChange: importFile });
    console.log(article);
    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {inputEl}
            <div style={{ flex: 1 }}>
                <EditMarkdown key="edit" defaultValue={article?.content} onChange={setContent} />
            </div>
            <Dropdown
                visible
                overlay={
                    <Menu
                        style={{ width: 200, textAlign: 'center' }}
                        onClick={({ key }) => {
                            if (key === 'sync') {
                                setSync((pre) => !pre);
                            }

                            if (key === 'import') {
                                handleSelectFile();
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
                        <Menu.Item key="save">存为草稿</Menu.Item>
                        <Menu.Item key="publish">发布</Menu.Item>
                    </Menu>
                }
            >
                <SettingOutlined
                    style={{ position: 'absolute', right: 10, top: -5, fontSize: 24, cursor: 'pointer' }}
                    className="transparency"
                />
            </Dropdown>
        </div>
    );
};

export default EditView;
