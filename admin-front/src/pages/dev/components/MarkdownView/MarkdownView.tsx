/** @format */
import React, { useState } from 'react';
import EditMarkdown from '../../../../shared/components/Markdown/Edit';
import content from './content';

const MarkdownView = () => {
    const [value, setValue] = useState<string>(content);

    return (
        <div style={{ flex: 1, display: 'flex' }}>
            <EditMarkdown value={value} onChange={setValue} />
        </div>
    );
};

export default MarkdownView;
