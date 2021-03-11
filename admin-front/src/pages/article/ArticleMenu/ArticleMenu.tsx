/** @format */
import React from 'react';
import { Button, Menu } from 'antd';
import { Link, useRouteMatch } from 'react-router-dom';
import ArticlesContainer from '../../../core/store/article';

const ArticleMenu = () => {
    const { setMode, articleId } = ArticlesContainer.useContainer();

    const match = useRouteMatch();

    const { articlesData, articlesSortIds } = ArticlesContainer.useContainer();
    return (
        <>
            <Menu
                selectedKeys={[String(articleId)]}
                style={{ flex: 1, overflow: 'auto' }}
                onClick={() => {
                    setMode('read');
                }}
            >
                {articlesSortIds.map((id) => {
                    return (
                        articlesData[id] && (
                            <Menu.Item key={id}>
                                <Link to={`${match.url}/${id}`}>{articlesData[id].title}</Link>
                            </Menu.Item>
                        )
                    );
                })}
            </Menu>
            <Button
                type="primary"
                onClick={() => {
                    setMode('edit');
                }}
                style={{ width: '100%' }}
            >
                <Link to="/article/0">新增</Link>
            </Button>
        </>
    );
};

export default ArticleMenu;
