/** @format */
import { Card, Divider, Menu, Popover } from 'antd';
import React from 'react';
import { EditOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ShortNotesContainer from '../../../core/store/shortNote';

interface ShortNoteProps {
    title: string;
    content: string;
    id: number;
    keywords: string[];
}

const ShortNote = ({ title = '', content = '', keywords = [], id = 0 }: ShortNoteProps) => {
    const { openEditModal, deleteShortNote } = ShortNotesContainer.useContainer();
    return (
        <Card
            title={title}
            extra={
                <Popover
                    content={
                        <Menu>
                            <CopyToClipboard text={title}>
                                <Menu.Item key="copyTitle">复制标题</Menu.Item>
                            </CopyToClipboard>
                            <CopyToClipboard text={content}>
                                <Menu.Item key="copyContent">复制内容</Menu.Item>
                            </CopyToClipboard>
                            <CopyToClipboard text={JSON.stringify({ title, content })}>
                                <Menu.Item key="copyJson">复制为json格式</Menu.Item>
                            </CopyToClipboard>
                        </Menu>
                    }
                >
                    <CopyOutlined />
                </Popover>
            }
            hoverable
            actions={[
                <EditOutlined onClick={() => openEditModal(id)} key="edit" />,
                <DeleteOutlined onClick={() => deleteShortNote(id)} />,
            ]}
        >
            {content}
            <Divider style={{ margin: 4 }} />
            <div>{keywords.join(',')}</div>
        </Card>
    );
};

export default ShortNote;
