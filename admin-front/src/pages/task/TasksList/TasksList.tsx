/** @format */
import React from 'react';
import TasksContainer from '../../../core/store/task';
import Task from '../Task/Task';

const TasksList = () => {
    const { tasksData, tasksSortIds } = TasksContainer.useContainer();

    return (
        <div>
            {tasksSortIds.map((id) => {
                const task = tasksData[id];
                return task && <Task task={task} />;
            })}
        </div>
    );
};

export default TasksList;
