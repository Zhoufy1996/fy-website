/** @format */
import React, { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { RouterComponent } from '../core/router';
import routes from '../core/router/routes';
import Store from '../core/store';
import 'normalize.css';
import '../assets/styles/index.less';
import styles from './App.less';
import AuthContainer from '../core/store/auth';

const Main = () => {
    const [isInit, setInit] = useState<boolean>(false);
    const { verfityToken } = AuthContainer.useContainer();
    useEffect(() => {
        const init = async () => {
            try {
                await verfityToken();
            } finally {
                setInit(true);
            }
        };
        init();
    }, []);
    return isInit ? <RouterComponent routerData={routes} /> : <div>初始化中</div>;
};

const App = () => {
    return (
        <Store>
            <HashRouter>
                <Main />
            </HashRouter>
        </Store>
    );
};

export default App;
