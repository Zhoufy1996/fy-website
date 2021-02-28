/** @format */
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { RouterComponent } from '../core/router';
import routes from '../core/router/routes';
import Store from '../core/store';
import 'normalize.css';
import './App.less';

const App = () => {
    return (
        <Store>
            <HashRouter>
                <div>app</div>
                <RouterComponent routerData={routes} />
            </HashRouter>
        </Store>
    );
};

export default App;
