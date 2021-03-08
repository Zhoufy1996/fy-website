/** @format */
import React from 'react';
import { Button, Layout, Row } from 'antd';
import ShortNotesContainer from '../../../core/store/shortNote';
import EditShortNode from '../EditShortNote/EditShortNode';
import ShortNotesList from '../ShortNotesList/ShortNotesList';

const ShortNoteView = () => {
    const { openAddModal, modalId } = ShortNotesContainer.useContainer();

    return (
        <>
            <Layout style={{ padding: 24 }}>
                <Layout.Content>
                    <Row>
                        <Button onClick={openAddModal}>新增</Button>
                    </Row>
                    <Layout style={{ marginTop: 24 }}>
                        <Layout.Content>
                            <ShortNotesList />
                        </Layout.Content>
                    </Layout>
                </Layout.Content>
            </Layout>
            {modalId != null && <EditShortNode />}
        </>
    );
};

export default ShortNoteView;
