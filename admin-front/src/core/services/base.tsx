/** @format */
import { message } from 'antd';
import axios from 'axios';

const service = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:4000/api',
    timeout: 5000,
});

service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (error) => {
        let errorStr = '';
        if (error.response) {
            if (error.response.config.url === 'user/verifytoken') {
                return Promise.reject(error);
            }

            if (error.response.data.CODE) {
                errorStr = `${error.response.data.CODE}: ${error.response.data.MESSAGE}`;
            } else {
                errorStr = `${error.response.data.statusCode}: ${error.response.data.message}`;
            }
        } else {
            errorStr = '未知错误，可能是网络未连接或服务器已崩溃';
        }

        if (errorStr) {
            message.error(errorStr);
        }
        return Promise.reject(error);
    }
);

export default service;
