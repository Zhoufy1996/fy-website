/** @format */
import React, { useMemo } from 'react';
import { Col, Row } from 'antd';
import useRect from '../../../shared/hooks/useRect';
import ShortNotesContainer from '../../../core/store/shortNote';
import { range } from '../../../shared/utils/range';
import ShortNote from '../ShortNote/ShortNote';

const ShortNotesList = () => {
    const { width, ref } = useRect<HTMLDivElement>();

    const { shortNotesData, shortNotesSortIds } = ShortNotesContainer.useContainer();

    const rowCount = useMemo(() => {
        return Math.max(Math.floor(width / 300), 1);
    }, [width]);

    const columnCount = useMemo(() => {
        return Math.ceil(shortNotesSortIds.length / rowCount);
    }, [shortNotesSortIds.length, rowCount]);

    return (
        <div ref={ref}>
            {range(0, columnCount).map((n) => {
                const ids = shortNotesSortIds.slice(n * rowCount, (n + 1) * rowCount);
                return (
                    <Row key={n} gutter={[16, 16]}>
                        {ids.map((id) => {
                            const shortNote = shortNotesData[id];
                            return (
                                shortNote && (
                                    <Col key={id} span={24 / rowCount}>
                                        <ShortNote
                                            id={shortNote.id}
                                            title={shortNote.title}
                                            content={shortNote.content}
                                            keywords={shortNote.keywords}
                                        />
                                    </Col>
                                )
                            );
                        })}
                    </Row>
                );
            })}
        </div>
    );
};

export default ShortNotesList;
