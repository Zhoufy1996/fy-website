/** @format */
/** @format */

import { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const HomeRoutes = () => {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={match.url} component={lazy(() => import('./Home/Home'))} />
            </Switch>
        </>
    );
};

export default HomeRoutes;
