/** @format */
import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import HeaderView from '../../core/components/header/Header';

const AppRoutes = () => {
    return (
        <>
            <HeaderView />
            <div className="main-view">
                <Switch>
                    <Route path="/home" exact component={lazy(() => import('../home/home.routes'))} />
                </Switch>
            </div>
        </>
    );
};

export default AppRoutes;
