/** @format */
import React, { useMemo } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber, Select, Button, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import TasksContainer, { statusList } from '../../../core/store/task';
import { TaskBase } from '../../../core/types/task';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const EditTask = () => {
    const { modalId, tasksData, closeModal, addTask, updateTask, loading } = TasksContainer.useContainer();

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
            message.success('操作成功');
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
                progress: 0,
            };
        }
        return {
            title: tasksData[modalId].title,
            content: tasksData[modalId].content,
            award: tasksData[modalId].award,
            beginTime: tasksData[modalId].beginTime,
            endTime: tasksData[modalId].endTime,
            progress: tasksData[modalId].progress,
        };
    }, [modalId, tasksData]);

    return (
        <Modal
            title={modalId === -1 ? '新增' : `编辑`}
            onCancel={closeModal}
            maskClosable={false}
            visible
            closable
            destroyOnClose
            footer={[
                <Button onClick={handleOk} loading={loading}>
                    确定
                </Button>,
                <Button onClick={closeModal}>取消</Button>,
            ]}
        >
            <Form form={form} initialValues={initialValue} {...layout}>
                <Form.Item label="开始时间" name="beginTime">
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="结束时间" name="endTime">
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item label="标题" name="title">
                    <Input />
                </Form.Item>
                <Form.Item label="内容" name="content">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="奖励" name="award">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="进度" name="progress">
                    {statusList.map((taskStatus) => {
                        return <Select.Option value={taskStatus.value}>{taskStatus.name}</Select.Option>;
                    })}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTask;
