/** @format */
import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import HeaderView from '../../core/components/Header/Header';

const Home = lazy(() => import('../home/home.routes'));
const Article = lazy(() => import('../article/article.routes'));
const Task = lazy(() => import('../task/task.routes'));
const ShortNote = lazy(() => import('../shortnote/shortnote.routes'));
const Leetcode = lazy(() => import('../leetcode/leetcode.routes'));
const Dev = lazy(() => import('../dev/dev.routes'));

const AppRoutes = () => {
    // store数据变化导致match变化
    const match = useRouteMatch();
    return (
        <>
            <HeaderView key="header" />
            <div key="main" className="main-view">
                <Suspense fallback={<div>组件加载中x</div>}>
                    <Switch>
                        <Route key={`${match.url}home`} path="/home" component={Home} />
                        <Route key={`${match.url}article`} path="/article" component={Article} />
                        <Route key={`${match.url}task`} path="/task" component={Task} />
                        <Route key={`${match.url}shortnote`} path="/shortnote" component={ShortNote} />
                        <Route key={`${match.url}leetcode`} path="/leetcode" component={Leetcode} />
                        <Route key={`${match.url}dev`} path="/dev" component={Dev} />
                        <Redirect key="redirect" to="/home" />
                    </Switch>
                </Suspense>
            </div>
        </>
    );
};

export default AppRoutes;
