/** @format */
import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { RouterComponent } from '../core/router';
import getRoutes from '../core/router/routes';
import Store from '../core/store';
import 'normalize.css';
import '../assets/styles/index.less';
// import styles from './App.less';
import AuthContainer from '../core/store/auth';

const MainView = () => {
    const { isLogin } = AuthContainer.useContainer();

    const Routes = useMemo(() => {
        return <RouterComponent routerData={getRoutes(isLogin)} />;
    }, [isLogin]);
    return Routes;
};

const VerifyToken = ({ children }: { children: JSX.Element }) => {
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
    return isInit ? children : null;
};

const App = () => {
    return (
        <Store>
            <HashRouter>
                <VerifyToken>
                    <MainView />
                </VerifyToken>
            </HashRouter>
        </Store>
    );
};

export default App;
