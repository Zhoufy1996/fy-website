/** @format */
import React, { lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import ShortNotesContainer from '../../core/store/shortNote';

const ShortNoteView = lazy(() => import('./ShortNoteView/ShortNoteView'));

const ShortNoteRoutes = () => {
    const { findShortNotes } = ShortNotesContainer.useContainer();
    useEffect(() => {
        findShortNotes();
    }, [findShortNotes]);
    return (
        <>
            <Switch>
                <Route exact path="/shortnote" component={ShortNoteView} />
            </Switch>
        </>
    );
};

export default ShortNoteRoutes;
