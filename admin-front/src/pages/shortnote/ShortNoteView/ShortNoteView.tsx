/** @format */
import React from 'react';
import { Menu } from 'antd';
import ShortNotesContainer from '../../../core/store/shortNote';
import EditShortNode from '../EditShortNote/EditShortNode';
import SettingBtn from '../../../shared/components/SettingBtn/SettingBtn';
import ShortNotesList from '../ShortNotesList/ShortNotesList';

const ShortNoteView = () => {
    const { openAddModal, modalId } = ShortNotesContainer.useContainer();

    return (
        <>
            <div style={{ padding: 24, flex: 1 }}>
                <SettingBtn
                    overlay={
                        <Menu
                            style={{ width: 200, textAlign: 'center' }}
                            onClick={({ key }) => {
                                if (key === 'add') {
                                    openAddModal();
                                }
                            }}
                        >
                            <Menu.Item key="add">新增</Menu.Item>
                        </Menu>
                    }
                />
                <ShortNotesList />
            </div>
            {modalId != null && <EditShortNode key={modalId} />}
        </>
    );
};

export default ShortNoteView;
