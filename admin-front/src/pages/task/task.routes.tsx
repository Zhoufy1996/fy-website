/** @format */
import React, { lazy, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import TasksContainer from '../../core/store/task';

const TaskRoutes = () => {
    const match = useRouteMatch();
    const { findTasks } = TasksContainer.useContainer();
    useEffect(() => {
        findTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div>1</div>
            <Switch>
                <Route exact path={`${match.url}`} component={lazy(() => import('./TaskView/TaskView'))} />
                <Redirect to={`${match.url}`} />
            </Switch>
        </>
    );
};

export default TaskRoutes;
