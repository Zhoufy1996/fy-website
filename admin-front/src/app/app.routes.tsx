/** @format */
import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthContainer from '../core/store/auth';

const AppRoutes = () => {
    const { isLogin } = AuthContainer.useContainer();
    return (
        <Suspense fallback={<div>组件加载中</div>}>
            <Switch>
                <Route key="login" path="/login" exact component={lazy(() => import('../pages/login/login.routes'))} />
                {isLogin ? (
                    <Route key="admin" path="/" component={lazy(() => import('../pages/admin/admin.routes'))} />
                ) : null}
                <Redirect key="redirect" to={`/${isLogin ? 'home' : 'login'}`} />
            </Switch>
        </Suspense>
    );
};

export default AppRoutes;
