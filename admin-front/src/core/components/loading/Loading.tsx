/** @format */
import React from 'react';
import LoadingImg from '../../../assets/img/hudieren.jpg';

/**
 * 感知到网页在加载，有两种情况
 * 1. 网速快
 * 2. 网速慢
 */

const Loading = () => {
    return <img src={LoadingImg} height="50%" alt="loading" style={{ borderRadius: '50%' }} />;
};

export default Loading;
