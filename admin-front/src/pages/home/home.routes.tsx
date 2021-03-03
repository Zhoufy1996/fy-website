/** @format */
/** @format */

import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomeRoutes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/home" component={lazy(() => import('./Home/Home'))} />
            </Switch>
        </>
    );
};

export default HomeRoutes;
