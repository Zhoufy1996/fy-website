/** @format */
import React from 'react';
import AuthContainer from './auth';

const containers = [AuthContainer];

const Store = ({ children }: { children: JSX.Element }) => {
    return containers.reduce((child, Container) => {
        return <Container.Provider>{child}</Container.Provider>;
    }, children);
};

export default Store;
