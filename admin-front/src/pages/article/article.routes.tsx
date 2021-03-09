/** @format */
import React, { lazy, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import ArticleMenu from './ArticleMenu/ArticleMenu';
import ArticlesContainer from '../../core/store/article';

const ArticleView = lazy(() => import('./ArticleView/ArticleView'));

const ArticleRoutes = () => {
    const match = useRouteMatch();
    const { findArticles } = ArticlesContainer.useContainer();
    useEffect(() => {
        findArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ flex: 1, display: 'flex', padding: 24 }}>
            <div
                style={{
                    flexBasis: 200,
                    flexGrow: 0,
                    flexShrink: 0,
                    justifyContent: 'space-between',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <ArticleMenu />
            </div>
            <div style={{ flexGrow: 1, flexShrink: 1, marginLeft: 16, display: 'flex' }}>
                <Switch>
                    <Route exact path={`${match.url}/:id`} component={ArticleView} />
                    <Redirect to={`${match.url}/0`} />
                </Switch>
            </div>
        </div>
    );
};

export default ArticleRoutes;
