/** @format */
import { AlertOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Dropdown, Popover, Progress, Button } from 'antd';
import React from 'react';
import TasksContainer from '../../../core/store/task';

const TodoAlert = () => {
    const { tasksData, todoTasksIds, updateTask } = TasksContainer.useContainer();
    return (
        <Dropdown
            overlay={
                <div>
                    {todoTasksIds.map((id) => {
                        const task = tasksData[id];
                        return (
                            task && (
                                <div>
                                    <Popover title={task.title} content={task.content}>
                                        <span>{task.title}</span>
                                    </Popover>
                                    <Progress type="line" percent={task.progress} />
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            updateTask({
                                                ...task,
                                                progress: 100,
                                            });
                                        }}
                                    >
                                        <CheckCircleOutlined />
                                    </Button>
                                </div>
                            )
                        );
                    })}
                </div>
            }
        >
            <AlertOutlined />
        </Dropdown>
    );
};

export default TodoAlert;
