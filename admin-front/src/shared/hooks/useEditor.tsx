/** @format */
import { useState, useMemo, useCallback, useEffect } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

interface UseEditorProps {
    defaultValue?: string;
    onChange?: (v: string) => void;
}

const useEditor = ({ defaultValue, onChange }: UseEditorProps) => {
    const [editorState, setEditorState] = useState<EditorState>(() =>
        EditorState.createWithContent(convertFromRaw(markdownToDraft(defaultValue || '')))
    );

    const value = useMemo(() => {
        console.log(convertToRaw(editorState.getCurrentContent()));
        console.log(draftToMarkdown(convertToRaw(editorState.getCurrentContent())));
        return draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
    }, [editorState]);

    const onEditorChange = useCallback((newEditorState: EditorState) => {
        // Convert draftjs state to markdown
        setEditorState(newEditorState);
    }, []);

    const handleChangeValue = useCallback((str: string) => {
        setEditorState(EditorState.createWithContent(convertFromRaw(markdownToDraft(str))));
    }, []);

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(value);
        }
    }, [onChange, value]);

    return {
        value,
        editorState,
        onEditorChange,
        handleChangeValue,
    };
};

export default useEditor;
