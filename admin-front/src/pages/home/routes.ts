/** @format */
/** @format */

import { lazy } from 'react';
import { routerModel } from '../../core/router';

const homeRoutes: routerModel[] = [
    {
        name: 'home',
        key: 'login',
        path: '/home',
        component: lazy(() => import('./index')),
        shouldLogin: true,
    },
    {
        key: 'homeredirect',
        redirect: {
            from: '**',
            to: '/home',
        },
        path: '',
        name: '',
        shouldLogin: true,
    },
];

export default homeRoutes;
