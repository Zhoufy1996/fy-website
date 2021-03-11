/** @format */
import React from 'react';
import { Button } from 'antd';
import ShortNotesContainer from '../../../core/store/shortNote';
import EditShortNode from '../EditShortNote/EditShortNode';
import SettingBtn from '../../../shared/components/SettingBtn/SettingBtn';

const ShortNoteView = () => {
    const { openAddModal, modalId } = ShortNotesContainer.useContainer();

    return (
        <>
            <div style={{ padding: 24 }}>
                <SettingBtn overlay={<Button onClick={openAddModal}>新增</Button>} />
            </div>
            {modalId != null && <EditShortNode />}
        </>
    );
};

export default ShortNoteView;
