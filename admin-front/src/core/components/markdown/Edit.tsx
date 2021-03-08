/** @format */

import React, { useCallback, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ReadMarkdownProps {
    value?: string;
    defaultValue: string;
    onChange: (value: string) => void;
}

const ReadMarkdown: React.FC<ReadMarkdownProps> = ({ value, defaultValue, onChange }) => {
    const [v, setV] = useState<string>(value || defaultValue || '');

    const handleChange = useCallback(
        (s: string) => {
            setV(s);
            onChange(s);
        },
        [onChange]
    );

    return <ReactQuill theme="snow" value={v} onChange={handleChange} />;
};

export default ReadMarkdown;
