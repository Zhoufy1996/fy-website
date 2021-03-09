/** @format */
import React, { useCallback, useMemo, useRef } from 'react';
import { readTextFiles } from '../utils/readFile';

interface UseImportFileProps {
    onChange?: (res: string[]) => void;
    accept?: string[];
    multiple?: boolean;
}

const useImportFile = ({ onChange = () => {}, accept = [], multiple = false }: UseImportFileProps) => {
    const ref = useRef<HTMLInputElement>(null);

    const handleSelectFile = useCallback(() => {
        ref.current?.click();
    }, []);

    const handleChange = useCallback(async () => {
        if (ref.current?.files) {
            const res = await readTextFiles(ref.current.files);
            onChange(res);
        }
    }, [onChange]);

    const inputEl = useMemo(() => {
        // Note: 使用opacity 来隐藏文件输入，而不是使用 visibility: hidden 或者 display: none，因为辅助技术将后两种样式解释为文件 input 是不可交互的。
        return (
            <input
                ref={ref}
                id="fileimport"
                type="file"
                style={{ opacity: 0, position: 'fixed', zIndex: 0, left: -500, top: -500 }}
                onChange={handleChange}
                accept={accept.join(',')}
                multiple={multiple}
            />
        );
    }, [accept, multiple, handleChange]);

    return {
        inputEl,
        handleSelectFile,
    };
};

export default useImportFile;
