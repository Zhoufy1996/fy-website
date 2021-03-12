/** @format */
import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import 'normalize.css';
import '../assets/styles/index.less';
// import styles from './App.less';
import AuthContainer from '../core/store/auth';
import ScrollToTop from '../shared/components/ScrollToTop/ScrollToTop';
import AppRoutes from './app.routes';
import Store from '../core/store/app';

const VerifyToken = ({ children }: { children: JSX.Element[] }) => {
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
    }, [verfityToken]);
    return isInit ? <>{children}</> : null;
};

const App = () => {
    return (
        <AuthContainer.Provider>
            <Router>
                <Store>
                    <VerifyToken>
                        <ScrollToTop />
                        <AppRoutes />
                    </VerifyToken>
                </Store>
            </Router>
        </AuthContainer.Provider>
    );
};

export default App;
