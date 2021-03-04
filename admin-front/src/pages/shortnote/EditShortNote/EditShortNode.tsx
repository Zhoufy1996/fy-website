/** @format */
import { Modal, Form, Input, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useMemo } from 'react';
import ShortNotesContainer from '../../../core/store/shortNotes';
import { AddSortNoteProps } from '../../../core/types/shortNote';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const EditShortNode = () => {
    const { modalId, shortNotesData, closeModal, addShortNote, updateShortNote } = ShortNotesContainer.useContainer();
    const [form] = useForm();

    const handleOk = () => {
        form.validateFields().then((value) => {
            if (modalId === -1) {
                addShortNote(value);
            } else {
                updateShortNote(value);
            }
        });
    };

    const initialValue: AddSortNoteProps = useMemo(() => {
        if (modalId === -1 || modalId === null) {
            return {
                title: '',
                content: '',
                keywords: [],
            };
        }
        return {
            title: shortNotesData[modalId].title,
            content: shortNotesData[modalId].content,
            keywords: shortNotesData[modalId].keywords,
        };
    }, [modalId, shortNotesData]);

    return (
        <Modal onOk={handleOk} onCancel={closeModal} visible={modalId != null} closable destroyOnClose>
            <Form form={form} {...layout}>
                <Form.Item label="标题">
                    <Input />
                </Form.Item>
                <Form.Item label="内容">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditShortNode;
