/** @format */
import React, { lazy } from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import ArticleMenu from './ArticleMenu/ArticleMenu';
import ArticlesContainer from '../../core/store/article';

const ArticleRoutes = () => {
    const match = useRouteMatch();
    const { articlesSortIds } = ArticlesContainer.useContainer();

    return (
        <Layout>
            <Layout.Sider width={200}>
                <ArticleMenu />
            </Layout.Sider>

            <Layout style={{ padding: 24 }}>
                <Layout.Content className="content" style={{ padding: 24, overflow: 'auto' }}>
                    <Switch>
                        <Route
                            exact
                            path={`${match.url}/article/:id`}
                            component={lazy(() => import('./ArticleView/ArticleView'))}
                        />
                        <Redirect to={`${match.url}/article/${articlesSortIds[0]}`} />
                    </Switch>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default ArticleRoutes;
