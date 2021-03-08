/** @format */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

interface ReadMarkdownProps {
    content: string;
}

const ReadMarkdown: React.FC<ReadMarkdownProps> = ({ content }) => {
    return <ReactMarkdown className="markdown-body">{content}</ReactMarkdown>;
};

export default ReadMarkdown;
