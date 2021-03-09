/** @format */
import React from 'react';
import { TaskBase } from '../../../core/types/task';

interface TaskProps {
    task: TaskBase;
}

const Task: React.FC<TaskProps> = ({ task }) => {
    return <div>{task.content}</div>;
};

export default Task;
