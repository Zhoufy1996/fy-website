/** @format */
import { useCallback, useState } from 'react';
import { UnprivilegedEditor, Range } from 'react-quill';
import { Delta as TypeDelta, Sources } from 'quill';

interface UseEditorProps {
    defaultValue: string;
}

export const formatRange = (range: Range | null): string => {
    return range ? [range.index, range.index + range.length].join(',') : 'none';
};

const useEditor = ({ defaultValue }: UseEditorProps) => {
    const [value, setValue] = useState<string>(defaultValue || '');
    const [events, setEvents] = useState<string[]>([]);
    const [selection, setSelection] = useState<Range>(null);
    const onEditorChange = useCallback((_: string, __: TypeDelta, source: Sources, editor: UnprivilegedEditor) => {
        const currentValue = (editor.getText() as unknown) as string;

        setEvents((pre) => {
            return [`[${source}] text-change`, ...pre];
        });
        setValue(currentValue);
    }, []);

    const onEditorChangeSelection = useCallback(
        (range: Range, source: Sources) => {
            setSelection(range);
            setEvents((pre) => {
                return [`[${source}] selection-change(${formatRange(selection)} -> ${formatRange(range)})`, ...pre];
            });
        },
        [selection]
    );

    const onEditorFocus = useCallback((range: Range, source: Sources) => {
        setEvents((pre) => {
            return [`[${source}] focus(${formatRange(range)})`, ...pre];
        });
    }, []);

    const onEditorBlur = useCallback((previousRange: Range, source: Sources) => {
        setEvents((pre) => {
            return [`[${source}] blur(${formatRange(previousRange)})`, ...pre];
        });
    }, []);
    return {
        value,
        events,
        selection,
        onEditorChange,
        onEditorChangeSelection,
        onEditorFocus,
        onEditorBlur,
    };
};

export default useEditor;
