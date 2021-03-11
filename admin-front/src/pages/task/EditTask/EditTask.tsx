/** @format */
import React, { useMemo } from 'react';
import { Modal, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TasksContainer from '../../../core/store/task';
import { TaskBase } from '../../../core/types/task';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const EditTask = () => {
    const { modalId, tasksData, closeModal, addTask, updateTask } = TasksContainer.useContainer();

    const [form] = useForm();

    const handleOk = () => {
        form.validateFields().then(async (value) => {
            if (modalId === -1) {
                await addTask({
                    ...value,
                });
                closeModal();
            } else {
                await updateTask({
                    id: modalId,
                    ...value,
                });
                closeModal();
            }
        });
    };

    const initialValue: TaskBase = useMemo(() => {
        if (modalId === -1 || modalId === null) {
            return {
                title: '',
                content: '',
                award: 0,
                beginTime: new Date(),
                endTime: new Date(),
            };
        }
        return {
            title: tasksData[modalId].title,
            content: tasksData[modalId].content,
            award: tasksData[modalId].award,
            beginTime: tasksData[modalId].beginTime,
            endTime: tasksData[modalId].endTime,
        };
    }, [modalId, tasksData]);

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

export default EditTask;
