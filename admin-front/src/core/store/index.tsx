/** @format */
import React from 'react';

const containers: any[] = [];

const Store = ({ children }: { children: JSX.Element }) => {
    return containers.reduce((child, Container) => {
        return <Container.Provider>{child}</Container.Provider>;
    }, children);
};

export default Store;
