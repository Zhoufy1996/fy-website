/** @format */

import { lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

const LoginRoutes = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={match.url} component={lazy(() => import('./Login/Login'))} />
            <Redirect to={match.url} />
        </Switch>
    );
};

export default LoginRoutes;
