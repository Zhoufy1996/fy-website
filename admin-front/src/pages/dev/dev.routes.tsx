/** @format */

import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { lazy } from 'react';
import { Link, Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';

const DevRoutes = () => {
    const match = useRouteMatch();
    const location = useLocation();
    const locationArr = location.pathname.split('/');
    const seletedKey = locationArr[locationArr.length - 1];
    const defaultOpenKey = locationArr[locationArr.length - 2];
    return (
        <Layout>
            <Layout.Sider width={200}>
                <Menu mode="inline" selectedKeys={[seletedKey]} defaultOpenKeys={[defaultOpenKey]}>
                    <SubMenu key="packages" title="库学习">
                        <Menu.ItemGroup key="packages">
                            <Menu.Item key="react-spring">
                                <Link to={`${match.url}/packages/react-spring`}>react-spring</Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <SubMenu key="components" title="组件">
                        <Menu.ItemGroup key="component">
                            <Menu.Item key="loading">
                                <Link to={`${match.url}/components/loading`}>loading</Link>
                            </Menu.Item>
                            <Menu.Item key="markdown">
                                <Link to={`${match.url}/components/markdown`}>markdown</Link>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
            </Layout.Sider>

            <Layout style={{ padding: 24 }}>
                <Layout.Content className="content" style={{ padding: 24, overflow: 'auto', display: 'flex' }}>
                    <Switch>
                        <Route
                            exact
                            path={`${match.url}/packages/react-spring`}
                            component={lazy(() => import('./packages/ReactSpring/ReactSpring.demo'))}
                        />
                        <Route
                            exact
                            path={`${match.url}/components/loading`}
                            component={lazy(() => import('./components/LoadingView/LoadingView'))}
                        />
                        <Route
                            exact
                            path={`${match.url}/components/markdown`}
                            component={lazy(() => import('./components/MarkdownView/MarkdownView'))}
                        />
                        <Redirect to={`${match.url}/components/loading`} />
                    </Switch>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default DevRoutes;
