/** @format */
import React, { ReactNode, Suspense } from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';

export interface routerModel {
    path: string;
    key: string;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    children?: routerModel[];
    name: string;
    redirect?: {
        from: string;
        to: string;
    };
    showInNav?: boolean;
}

const transformRouter = (_router: routerModel[]): ReactNode[] => {
    const transSingle = (route: routerModel, _baseUrl: string): any => {
        if (route.children) {
            return route.children.map((routeChild) => {
                return transSingle(routeChild, `${_baseUrl}${route.path}`);
            });
        }

        if (route.redirect) {
            return <Redirect key={route.key} from={`${_baseUrl}${route.redirect.from}`} to={route.redirect.to} />;
        }

        return <Route component={route.component} exact key={route.key} path={`${_baseUrl}${route.path}`} />;
    };
    const result = _router.map((item) => transSingle(item, ''));
    return result;
};

interface RouterComponentProps {
    routerData: routerModel[];
}

export const RouterComponent = ({ routerData }: RouterComponentProps) => {
    return (
        <Suspense fallback={<div>组件加载中</div>}>
            <Switch>{transformRouter(routerData)}</Switch>
        </Suspense>
    );
};
