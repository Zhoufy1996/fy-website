/** @format */
import { Card, Menu, Popover } from 'antd';
import React from 'react';
import { EditOutlined, CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ShortNoteProps {
    title: string;
    content: string;
    keywords: string[];
}

const ShortNote = ({ title = '', content = '', keywords = [] }: ShortNoteProps) => {
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
            actions={[<EditOutlined key="edit" />]}
        >
            {content}
            {keywords.map((s) => s)}
        </Card>
    );
};

export default ShortNote;
