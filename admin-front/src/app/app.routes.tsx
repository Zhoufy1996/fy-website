/** @format */
import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthContainer from '../core/store/auth';

const AppRoutes = () => {
    const { isLogin } = AuthContainer.useContainer();
    return (
        <Switch>
            <Route path="/login" exact component={lazy(() => import('../pages/login/login.routes'))} />
            {isLogin ? (
                <>
                    <Route path="/" component={lazy(() => import('../pages/home/home.routes'))} />
                </>
            ) : null}
            <Redirect to={`/${isLogin ? 'home' : 'login'}`} />
        </Switch>
    );
};

export default AppRoutes;
