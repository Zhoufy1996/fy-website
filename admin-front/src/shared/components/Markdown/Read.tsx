/** @format */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import 'github-markdown-css';
import CodeBlock from './CodeBlock';

interface ReadMarkdownProps {
    content: string;
}

const ReadMarkdown: React.FC<ReadMarkdownProps> = ({ content }) => {
    return (
        <ReactMarkdown renderers={{ code: CodeBlock }} plugins={[gfm]} className="markdown-body">
            {content}
        </ReactMarkdown>
    );
};

export default ReadMarkdown;
