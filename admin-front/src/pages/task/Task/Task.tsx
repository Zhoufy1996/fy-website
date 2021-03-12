/** @format */
import { Card, Progress } from 'antd';
import React from 'react';
import { statusList } from '../../../core/store/task';
import { TaskBase } from '../../../core/types/task';

interface TaskProps {
    task: TaskBase;
}

const Task: React.FC<TaskProps> = ({ task }) => {
    return (
        <Card
            title={task.title}
            extra={
                <Progress
                    type="circle"
                    percent={task.progress}
                    format={(percent) => {
                        return statusList.find((item) => item.value === percent)?.name;
                    }}
                />
            }
        >
            {task.beginTime} - {task.endTime}
            {task.content}
            {task.award}
        </Card>
    );
};

export default Task;
