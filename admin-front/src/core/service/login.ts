/** @format */

import service from './base';

interface LoginAsyncValues {
    username: string;
    password: string;
    remember: boolean;
}

export const loginAsync = (values: LoginAsyncValues): Promise<{ accessToken: string }> => {
    return service.post('login', values);
};

export const verfityTokenAsync = (): Promise<void> => {
    return service.post('verfitytoken');
};
