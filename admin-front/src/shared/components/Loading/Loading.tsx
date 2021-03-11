/** @format */
import React from 'react';
import { useSpring, animated } from 'react-spring';
import LoadingImg from '../../../assets/img/hudieren.jpg';

/**
 * 感知到网页在加载，有两种情况
 * 1. 网速快
 * 2. 网速慢
 */
const Loading = () => {
    const props = useSpring({ opacity: 1, from: { opacity: 0 } });
    return <animated.img src={LoadingImg} height="50%" alt="loading" style={{ ...props, borderRadius: '50%' }} />;
};

export default Loading;
