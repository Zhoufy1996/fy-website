/** @format */
import React from 'react';
import { Menu } from 'antd';
import { useParams } from 'react-router-dom';
import ReadMarkdown from '../../../shared/components/Markdown/Read';
import ArticlesContainer from '../../../core/store/article';
import NotFound from '../NotFound/NotFound';
import SettingBtn from '../../../shared/components/SettingBtn/SettingBtn';

interface ReadViewProps {}

const ReadView: React.FC<ReadViewProps> = () => {
    const params = useParams<{ id: string }>();
    const { articlesData, startUpdate } = ArticlesContainer.useContainer();

    const article = articlesData[Number(params.id)];

    return article ? (
        <div style={{ flex: 1 }}>
            <ReadMarkdown content={article.content} />
            <SettingBtn
                overlay={
                    <Menu
                        onClick={() => {
                            startUpdate(Number(params.id));
                        }}
                    >
                        <Menu.Item key="edit">编辑</Menu.Item>
                    </Menu>
                }
            />
        </div>
    ) : (
        <NotFound />
    );
};

export default ReadView;
