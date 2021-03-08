/** @format */
import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import ArticlesContainer from '../../../core/store/article';

const ArticleMenu = () => {
    const match = useRouteMatch();
    const location = useLocation();
    const locationArr = location.pathname.split('/');
    const seletedKey = locationArr[locationArr.length - 1];
    const { articlesData, articlesSortIds } = ArticlesContainer.useContainer();
    return (
        <Menu selectedKeys={[seletedKey]}>
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
    );
};

export default ArticleMenu;
