/** @format */
import React, { lazy } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import HeaderView from '../../core/components/header/Header';

const AppRoutes = () => {
    const match = useRouteMatch();
    return (
        <>
            <HeaderView />
            <div className="main-view">
                <Switch>
                    <Route path={`${match.url}home`} component={lazy(() => import('../home/home.routes'))} />
                    <Route path={`${match.url}article`} component={lazy(() => import('../article/article.routes'))} />
                    <Route path={`${match.url}task`} component={lazy(() => import('../task/task.routes'))} />
                    <Route
                        path={`${match.url}shortnote`}
                        component={lazy(() => import('../shortnote/shortnote.routes'))}
                    />
                    <Route
                        path={`${match.url}leetcode`}
                        component={lazy(() => import('../leetcode/leetcode.routes'))}
                    />
                    <Route path={`${match.url}dev`} component={lazy(() => import('../dev/dev.routes'))} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        </>
    );
};

export default AppRoutes;
