/** @format */
import React from 'react';
import { Button, Menu } from 'antd';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import ArticlesContainer from '../../../core/store/article';

const ArticleMenu = () => {
    const { startAdd } = ArticlesContainer.useContainer();
    const match = useRouteMatch();
    const params = useParams<{ id: string }>();

    const { articlesData, articlesSortIds } = ArticlesContainer.useContainer();
    return (
        <>
            <Menu selectedKeys={[params.id]} style={{ flex: 1 }}>
                {articlesSortIds.map((id) => {
                    return (
                        articlesData[id] && (
                            <Menu.Item key={id}>
                                <Link to={`${match.url}/article/${id}`}>{articlesData[id].title}</Link>
                            </Menu.Item>
                        )
                    );
                })}
            </Menu>
            <Button type="primary" onClick={startAdd} style={{ width: '100%' }}>
                新增
            </Button>
        </>
    );
};

export default ArticleMenu;
