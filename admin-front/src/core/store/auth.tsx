/** @format */

import { useCallback, useState } from 'react';
import { createContainer } from 'unstated-next';
import { loginAsync, verfityTokenAsync } from '../services/login';

interface loginValues {
    username: string;
    password: string;
    remember: boolean;
}

/** @format */
const useAuth = () => {
    const [isLogin, setLogin] = useState<boolean>(false);
    const login = useCallback(async (values: loginValues) => {
        await loginAsync(values);
        setLogin(true);
    }, []);

    const logout = useCallback(() => {
        setLogin(false);
    }, []);

    const verfityToken = useCallback(async () => {
        try {
            await verfityTokenAsync();
            setLogin(true);
        } catch (e) {
            setLogin(false);
            return Promise.reject(e);
        }
        return '';
    }, []);

    return {
        login,
        logout,
        isLogin,
        verfityToken,
    };
};

const AuthContainer = createContainer(useAuth);

export default AuthContainer;
