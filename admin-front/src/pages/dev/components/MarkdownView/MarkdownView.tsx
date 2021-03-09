/** @format */
import React from 'react';
import EditMarkdown from '../../../../shared/components/Markdown/Edit';
import content from './content';

const MarkdownView = () => {
    return (
        <div style={{ flex: 1, display: 'flex' }}>
            <EditMarkdown defaultValue={content} />
        </div>
    );
};

export default MarkdownView;
