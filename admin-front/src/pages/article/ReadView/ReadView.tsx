/** @format */
import React from 'react';
import { Menu } from 'antd';
import ReadMarkdown from '../../../shared/components/Markdown/Read';
import ArticlesContainer from '../../../core/store/article';
import NotFound from '../NotFound/NotFound';
import SettingBtn from '../../../shared/components/SettingBtn/SettingBtn';

interface ReadViewProps {}

const ReadView: React.FC<ReadViewProps> = () => {
    const { articlesData, setMode, articleId } = ArticlesContainer.useContainer();

    const article = articlesData[articleId];
    return article ? (
        <div style={{ flex: 1 }}>
            <ReadMarkdown content={article.content} />
            <SettingBtn
                overlay={
                    <Menu
                        onClick={() => {
                            setMode('edit');
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
