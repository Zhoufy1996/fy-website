/** @format */
import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const ArticleRoutes = () => {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${match.url}`} component={lazy(() => import('./ArticleView/ArticleView'))} />
            </Switch>
        </>
    );
};

export default ArticleRoutes;
