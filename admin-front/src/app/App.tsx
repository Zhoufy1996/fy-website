/** @format */
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Store from '../core/store/component';
import 'normalize.css';
import '../assets/styles/index.less';
// import styles from './App.less';
import AuthContainer from '../core/store/auth';
import ScrollToTop from '../core/components/scrollToTop/ScrollToTop';
import AppRoutes from './app.routes';

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
    }, []);
    return isInit ? <>{children}</> : null;
};

const App = () => {
    return (
        <Store>
            <BrowserRouter>
                <VerifyToken>
                    <ScrollToTop />
                    <AppRoutes />
                </VerifyToken>
            </BrowserRouter>
        </Store>
    );
};

export default App;
