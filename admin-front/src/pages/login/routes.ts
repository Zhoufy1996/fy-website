/** @format */

import { lazy } from 'react';
import { routerModel } from '../../core/router';

const loginRoutes: routerModel[] = [
    {
        name: 'login',
        key: 'login',
        path: '/login',
        component: lazy(() => import('./index')),
        shouldLogin: false,
    },
    {
        key: 'loginredirect',
        redirect: {
            from: '**',
            to: '/login',
        },
        path: '',
        name: '',
        shouldLogin: false,
    },
];

export default loginRoutes;
