/** @format */
import React from 'react';
import ArticlesContainer from './article';
import ShortNotesContainer from './shortNote';
import TasksContainer from './task';

const containers = [ShortNotesContainer, ArticlesContainer, TasksContainer];

const Store: React.FC<any> = ({ children }) => {
    return containers.reduce((child, Container) => {
        return <Container.Provider>{child}</Container.Provider>;
    }, children);
};

export default Store;
