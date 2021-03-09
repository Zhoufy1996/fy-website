/** @format */
import { useEffect, useRef, useState } from 'react';

const onScroll = <T extends HTMLElement>(scrollElement: T, syncElement: T) => {
    const scroll = () => {
        const { scrollTop, scrollHeight, offsetHeight } = scrollElement;
        const { scrollHeight: syncScrollHeight } = syncElement;
        if (scrollTop + offsetHeight + 2 >= scrollHeight) {
            syncElement.scrollTo({ top: syncScrollHeight });
        } else {
            syncElement.scrollTo({ top: (scrollTop / scrollHeight) * syncScrollHeight });
        }
    };
    scrollElement.addEventListener('scroll', scroll);
    return () => {
        scrollElement.removeEventListener('scroll', scroll);
    };
};

/**
 * 卡顿，因为scroll事件互相触发
 * 当width改变，需要重新同步吗
 */
const useSyncScroll = <T extends HTMLElement>() => {
    const ref1 = useRef<T>(null);
    const ref2 = useRef<T>(null);
    const [scrollRef, setScrollRef] = useState<'ref1' | 'ref2' | ''>('');
    useEffect(() => {
        const element1 = ref1.current;
        const element2 = ref2.current;
        if (element1 && element2) {
            const onMouseover1 = () => setScrollRef('ref1');
            const onMouseover2 = () => setScrollRef('ref2');
            element1.addEventListener('mouseover', onMouseover1);
            element2.addEventListener('mouseover', onMouseover2);
            return () => {
                if (element1 && element2) {
                    element1.removeEventListener('mouseover', onMouseover1);
                    element1.removeEventListener('mouseover', onMouseover2);
                }
            };
        }
        return () => {};
    }, []);

    useEffect(() => {
        const element1 = ref1.current;
        const element2 = ref2.current;

        if (element1 && element2) {
            if (scrollRef === 'ref1') {
                return onScroll(element1, element2);
            }

            if (scrollRef === 'ref2') {
                return onScroll(element2, element1);
            }
        }
        return () => {};
    }, [scrollRef]);

    return {
        ref1,
        ref2,
    };
};

export default useSyncScroll;
