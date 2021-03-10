/** @format */
import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

import 'codemirror/mode/markdown/markdown';

interface CodeMirrorEditorProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    readOnly?: boolean;
    defaultValue?: string;
    textAreaClassName?: string;
}

class CodeMirrorEditor extends React.Component<CodeMirrorEditorProps, { isControlled: boolean }> {
    editorRef: React.RefObject<HTMLTextAreaElement>;

    editor: CodeMirror.EditorFromTextArea | undefined;

    constructor(props: CodeMirrorEditorProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.editorRef = React.createRef<HTMLTextAreaElement>();
    }

    componentDidMount() {
        this.editor = CodeMirror.fromTextArea(this.editorRef.current as HTMLTextAreaElement, {
            lineWrapping: true,
            mode: 'markdown',
            theme: 'monokai',
        });
        this.editor.on('change', this.handleChange);
        setTimeout(() => {
            this.editor?.refresh();
        }, 100);
    }

    componentDidUpdate() {
        if (!this.editor) {
            return;
        }
        const { value } = this.props;
        if (value) {
            if (this.editor.getValue() !== value) {
                this.editor.setValue(value);
            }
        }
    }

    componentWillUnmount() {
        this.editor?.off('change', this.handleChange);
    }

    handleChange() {
        if (!this.editor) {
            return;
        }
        const { onChange, value } = this.props;
        const editorValue = this.editor.getValue();
        if (editorValue === value) {
            return;
        }
        if (onChange) {
            onChange({ target: { value: editorValue } } as React.ChangeEvent<HTMLTextAreaElement>);
        }
    }

    render() {
        const { value, readOnly, defaultValue, onChange, textAreaClassName = '' } = this.props;
        const editor = React.createElement('textarea', {
            ref: this.editorRef,
            value,
            readOnly,
            defaultValue,
            onChange,
            className: textAreaClassName,
        });
        return React.createElement('div', null, editor);
    }
}

export default CodeMirrorEditor;
