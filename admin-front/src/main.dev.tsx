/** @format */
import React from 'react';
import ReactDom from 'react-dom';
import HotApp from './app.hot';

declare const module: any;

const render = () => {
    ReactDom.render(<HotApp />, document.getElementById('root'));
};

render();

if (module.hot) {
    module.hot.accept('./app.hot.tsx', () => {
        // eslint-disable-next-line no-console
    });
}
