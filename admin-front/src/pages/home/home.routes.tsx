/** @format */

import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const HomeRoutes = () => {
    const match = useRouteMatch();
    window.console.log(match);
    return (
        <>
            <Switch>
                <Route exact path={match.url} component={lazy(() => import('./Home/Home'))} />
            </Switch>
        </>
    );
};

export default HomeRoutes;
