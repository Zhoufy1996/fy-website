/** @format */
import React, { useCallback, useEffect, useState } from 'react';

const useRect = (ref: React.RefObject<HTMLElement>) => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const setRect = useCallback(() => {
        if (ref && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            if (rect != null) {
                setWidth(rect.width);
                setHeight(rect.height);
            }
        }
    }, [ref]);

    useEffect(() => {
        setRect();
    }, [setRect]);

    useEffect(() => {
        window.addEventListener('resize', setRect);
        return () => {
            window.removeEventListener('resize', setRect);
        };
    }, [setRect]);

    return {
        width,
        height,
    };
};

export default useRect;
