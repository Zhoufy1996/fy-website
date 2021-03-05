/** @format */
import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const ShortNoteRoutes = () => {
    return (
        <>
            <Switch>
                <Route exact path="/shortnote" component={lazy(() => import('./ShortNoteView/ShortNoteView'))} />
            </Switch>
        </>
    );
};

export default ShortNoteRoutes;
