/** @format */
import React, { useCallback, useEffect, useState } from 'react';
import { Editor } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ReadMarkdown from './Read';
import styles from './Edit.less';
import useMove from '../../hooks/useMove';
import useRect from '../../hooks/useRect';
import useSyncScroll from '../../hooks/useSyncScroll';
import useEditor from '../../hooks/useEditor';

interface DProps {
    defaultValue?: string;
    onChange?: (v: string) => void;
}

/**
 * 1. 样式
 * 2. 同步滚动 按比例
 * 3. 拖拽图片
 * 4. 导入(图片怎么办)
 *
 */
const EditMarkdown: React.FC<DProps> = ({ defaultValue = '', onChange = () => {} }) => {
    const { value, editorState, onEditorChange } = useEditor({
        defaultValue,
        onChange,
    });

    const { ref: rootRef, width } = useRect<HTMLDivElement>();

    const [writeWidth, setWriteWidth] = useState<number>(0);

    useEffect(() => {
        setWriteWidth((pre) => {
            return pre === 0 ? Math.max(0, (width - 5) / 2) : pre;
        });
    }, [width]);

    const onMove = useCallback((offsetX) => {
        setWriteWidth((pre) => {
            return pre + offsetX;
        });
    }, []);

    console.log(value);

    const { startMove, move, endMove } = useMove(onMove);

    const { ref1, ref2 } = useSyncScroll<HTMLDivElement>();
    return (
        <div className={styles.root} onMouseUp={endMove} onMouseLeave={endMove} ref={rootRef} onMouseMove={move}>
            <div ref={ref1} className={styles.write} style={{ width: writeWidth }}>
                <Editor placeholder="快来填写内容吧" editorState={editorState} onChange={onEditorChange} />
            </div>
            <div className={styles.divide} onMouseDown={startMove} />

            <div ref={ref2} className={styles.read}>
                <ReadMarkdown content={value} />
            </div>
        </div>
    );
};

export default EditMarkdown;
