/** @format */
import { Modal, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useMemo } from 'react';
import ShortNotesContainer from '../../../core/store/shortNote';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

// destroyOnClose form
// https://github.com/ant-design/ant-design/issues/4165
// https://github.com/ant-design/ant-design/issues/21334
const EditShortNode = () => {
    const { modalId, shortNotesData, closeModal, addShortNote, updateShortNote } = ShortNotesContainer.useContainer();
    const [form] = useForm();

    const handleOk = () => {
        form.validateFields().then(async (value) => {
            if (modalId === -1) {
                await addShortNote({
                    ...value,
                    keywords: value.keywords.split(' '),
                });
                closeModal();
            } else {
                await updateShortNote({
                    id: modalId,
                    ...value,
                    keywords: value.keywords.split(' '),
                });
                closeModal();
            }
        });
    };

    const initialValue = useMemo(() => {
        if (modalId === -1 || modalId === null) {
            return {
                title: '',
                content: '',
                keywords: '',
            };
        }
        return {
            title: shortNotesData[modalId].title,
            content: shortNotesData[modalId].content,
            keywords: shortNotesData[modalId].keywords.join(' '),
        };
    }, [modalId, shortNotesData]);
    return (
        <Modal
            title={modalId === -1 ? '新增' : `编辑`}
            onOk={handleOk}
            onCancel={closeModal}
            visible
            closable
            destroyOnClose
        >
            <Form form={form} initialValues={initialValue} {...layout}>
                <Form.Item label="标题" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="内容" name="content">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="关键词" name="keywords">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditShortNode;
