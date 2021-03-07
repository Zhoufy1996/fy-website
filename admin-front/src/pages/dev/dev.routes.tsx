/** @format */

import { Layout, Menu } from 'antd';
import React, { lazy } from 'react';
import { Link, Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';

const DevRoutes = () => {
    const match = useRouteMatch();
    const location = useLocation();
    const locationArr = location.pathname.split('/');
    const seletedKey = locationArr[locationArr.length - 1];
    return (
        <Layout>
            <Layout.Sider width={200}>
                <Menu selectedKeys={[seletedKey]}>
                    <Menu.Item key="loading">
                        <Link to={`${match.url}/components/loading`}>loading</Link>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>

            <Layout style={{ padding: 24 }}>
                <Layout.Content className="content" style={{ padding: 24, overflow: 'auto' }}>
                    <Switch>
                        <Route
                            exact
                            path={`${match.url}/components/loading`}
                            component={lazy(() => import('./components/LoadingView/LoadingView'))}
                        />
                        <Redirect to={`${match.url}/components/loading`} />
                    </Switch>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default DevRoutes;
