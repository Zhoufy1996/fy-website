/** @format */

import { createContainer } from 'unstated-next';
import useCurd from '../../shared/hooks/useCurd';
import { addTaskAsync, deleteTaskAsync, findTasksAsync, updateTaskAsync } from '../services/task';
import { TaskBase } from '../types/task';

const sortName = 'task';

const useTasks = () => {
    const {
        dataSource,
        sortIds,
        editId,
        startAdd,
        startUpdate,
        endEdit,
        findDataSource,
        addData,
        updateData,
        deleteData,
    } = useCurd<TaskBase>({
        findAllAsync: findTasksAsync,
        addAsync: addTaskAsync,
        updateAsync: updateTaskAsync,
        deleteAsync: deleteTaskAsync,
        sortName,
    });

    return {
        tasksData: dataSource,
        tasksSortIds: sortIds,
        modalId: editId,
        openAddModal: startAdd,
        openEditModal: startUpdate,
        closeModal: endEdit,
        findTasks: findDataSource,
        addTask: addData,
        updateTask: updateData,
        deleteTask: deleteData,
    };
};

const TasksContainer = createContainer(useTasks);

export default TasksContainer;
