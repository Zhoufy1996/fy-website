/** @format */
import React, { useEffect, useState } from 'react';
import { HashRouter, useHistory } from 'react-router-dom';
import { RouterComponent } from '../core/router';
import routes from '../core/router/routes';
import Store from '../core/store';
import 'normalize.css';
import '../assets/styles/index.less';
// import styles from './App.less';
import AuthContainer from '../core/store/auth';

const MainView = ({ children }: { children: JSX.Element }) => {
    const [isInit, setInit] = useState<boolean>(false);
    const { verfityToken } = AuthContainer.useContainer();

    const history = useHistory();

    useEffect(() => {
        const init = async () => {
            try {
                await verfityToken();
                history.push('admin');
            } catch (e) {
                history.push('login');
            } finally {
                setInit(true);
            }
        };
        init();
    }, []);

    return isInit ? children : <div>初始化中</div>;
};

const App = () => {
    return (
        <Store>
            <HashRouter>
                <MainView>
                    <RouterComponent routerData={routes} />
                </MainView>
            </HashRouter>
        </Store>
    );
};

export default App;
