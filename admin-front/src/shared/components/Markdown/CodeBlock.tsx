/** @format */
import React, { useEffect, useRef } from 'react';
import highlight from 'highlight.js';
import 'highlight.js/styles/github.css';

const CodeBlock = ({ language, value }: { language: string; value: string }) => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            highlight.highlightBlock((ref.current as unknown) as HTMLElement);
        }
    }, [ref, value]);
    return (
        <pre>
            <code ref={ref} className={`language-${language}`}>
                {value}
            </code>
        </pre>
    );
};

export default CodeBlock;
