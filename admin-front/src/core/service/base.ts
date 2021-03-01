/** @format */

import { message } from 'antd';
import axios from 'axios';

const service = axios.create({
    baseURL: 'http://127.0.0.1:4200/api',
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
        message.error(error);
    }
);

export default service;
