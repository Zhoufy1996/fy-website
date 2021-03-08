/** @format */

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ReadMarkdownProps {
    content: string;
}

const ReadMarkdown: React.FC<ReadMarkdownProps> = ({ content }) => {
    return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default ReadMarkdown;
