/** @format */
import React from 'react';
import ArticlesContainer from './article';
import AuthContainer from './auth';
import ShortNotesContainer from './shortNote';
import TasksContainer from './task';

const containers = [AuthContainer, ShortNotesContainer, ArticlesContainer, TasksContainer];

const Store = ({ children }: { children: JSX.Element }) => {
    return containers.reduce((child, Container) => {
        return <Container.Provider>{child}</Container.Provider>;
    }, children);
};

export default Store;
