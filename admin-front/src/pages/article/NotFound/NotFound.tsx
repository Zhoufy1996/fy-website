/** @format */
import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const NotFound = () => {
    return (
        <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title type="warning">欢迎进入文章模块，请进行操作</Title>
        </div>
    );
};

export default NotFound;
