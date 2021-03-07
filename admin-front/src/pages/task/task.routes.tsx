/** @format */
import React, { lazy } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const TaskRoutes = () => {
    const match = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${match.url}`} component={lazy(() => import('./TaskView/TaskView'))} />
            </Switch>
        </>
    );
};

export default TaskRoutes;
