/** @format */

import React, { useEffect } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import ReadMarkdown from './Read';
import useRect from '../../../shared/hooks/useRect';
import 'react-markdown-editor-lite/lib/index.css';

interface EditMarkdownProps {
    defaultValue?: string;
    onChange?: (value: string) => void;
}

const mdParser = new MarkdownIt();

// https://github.com/HarryChen0506/react-markdown-editor-lite/blob/master/src/demo/index.tsx
const EditMarkdown: React.FC<EditMarkdownProps> = ({ defaultValue, onChange }) => {
    return (
        <div style={{ flex: 1, display: 'flex' }} ref={ref}>
            <div style={{ flex: 1 }}>
                <MdEditor
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                    style={{ height }}
                />
            </div>

            <div style={{ flex: 1 }}>
                <ReadMarkdown content={value} />
            </div>
        </div>
    );
};

export default EditMarkdown;
