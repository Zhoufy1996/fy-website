/** @format */

import { useEffect, useRef } from 'react';

type TimerHandler = () => void;

interface UseSyncDataProps {
    callback: TimerHandler;
    delay: number;
}

// 使用localStorage
const useSyncData = ({ delay, callback }: UseSyncDataProps) => {
    const savedCallback = useRef<TimerHandler>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }, delay);
        return () => {
            clearInterval(intervalId);
        };
    }, [delay]);
};

export default useSyncData;
