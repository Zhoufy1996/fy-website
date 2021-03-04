/** @format */
import React from 'react';
import AuthContainer from './auth';
import ShortNotesContainer from './shortNotes';

const containers = [AuthContainer, ShortNotesContainer];

const Store = ({ children }: { children: JSX.Element }) => {
    return containers.reduce((child, Container) => {
        return <Container.Provider>{child}</Container.Provider>;
    }, children);
};

export default Store;
