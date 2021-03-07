/** @format */

import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const LeetcodeRoutes = () => {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${match.url}`} component={lazy(() => import('./LeetcodeView/leetcodeView'))} />
            </Switch>
        </>
    );
};

export default LeetcodeRoutes;
