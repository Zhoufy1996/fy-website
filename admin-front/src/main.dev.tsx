/** @format */

import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './app/App';

declare const module: any;

const HotApp = hot(App);

const render = () => {
    ReactDom.render(<HotApp />, document.getElementById('root'));
};

render();

if (module.hot) {
    module.hot.accept('./app/App.tsx', () => {
        // eslint-disable-next-line no-console
        console.log('热更新');
    });
}
