/** @format */
import React from 'react';
import { Button, Input, Layout, Row } from 'antd';
import ShortNotesContainer from '../../../core/store/shortNotes';

const ShortNoteView = () => {
    const { openAddModal } = ShortNotesContainer.useContainer();

    return (
        <>
            <Layout>
                <Layout.Content>
                    <Row>
                        <Button>同步到xx</Button>
                        <Button onClick={openAddModal}>新增</Button>
                        <Input.Search />
                    </Row>
                </Layout.Content>
            </Layout>
        </>
    );
};

export default ShortNoteView;
