/** @format */
import { useMemo, useState } from 'react';
import { Moment } from 'moment';
import dayjs from 'dayjs';
import { createContainer } from 'unstated-next';
import useCurd from '../../shared/hooks/useCurd';
import { addTaskAsync, deleteTaskAsync, findTasksAsync, updateTaskAsync } from '../services/task';
import { TaskBase } from '../types/task';

const sortName = 'task';

export enum QUERYTYPE {
    BYWEEK = 'byweek',
    BYMONTH = 'bymonth',
    BYCUSTOM = 'bycustom',
}

export enum Status {
    UNDO = 'undo',
    DOING = 'doing',
    DONE = 'done',
}

// === 0 相等
// > 0 左边大
// < 0 右边大
// null 表示无穷
const diff = (left: Moment | null, right: Moment | null) => {
    const leftTime = left || (dayjs('2099-01-01') as Moment);
    const rightTime = right || (dayjs('2099-01-01') as Moment);

    return leftTime.diff(rightTime, 'days');
};

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

    const [beginTime, setBeginTime] = useState<Moment | null>(null);
    const [endTime, setEndTime] = useState<Moment | null>(null);
    const [status, setStatus] = useState<Status>(Status.UNDO);

    const [queryType, setQueryType] = useState<QUERYTYPE>(QUERYTYPE.BYWEEK);

    const tasksDataIds = useMemo(() => {
        return sortIds
            .filter((id) => {
                const item = dataSource[id];
                if (item) {
                    if (status === Status.UNDO) {
                        return item.progress === 0;
                    }

                    if (status === Status.DOING) {
                        return item.progress > 0 && item.progress < 100;
                    }

                    if (status === Status.DONE) {
                        return item.progress === 100;
                    }
                }
                return false;
            })
            .filter((id) => {
                if (dataSource[id]) {
                    return (
                        diff(beginTime, dayjs(dataSource[id].beginTime) as Moment) <= 0 &&
                        diff(endTime, dayjs(dataSource[id].endTime) as Moment) >= 0
                    );
                }
                return false;
            })
            .sort((leftId, rightId) => {
                return -diff(
                    dayjs(dataSource[leftId].beginTime) as Moment,
                    dayjs(dataSource[rightId].beginTime) as Moment
                );
            });
    }, [dataSource, sortIds, beginTime, endTime, status]);

    const todoTasksIds = useMemo(() => {
        return sortIds.filter((id) => {
            const item = dataSource[id];
            if (item) {
                return item.progress < 100 && dayjs(item.beginTime).isBefore(dayjs());
            }

            return false;
        });
    }, [sortIds, dataSource]);

    return {
        tasksData: dataSource,
        tasksSortIds: tasksDataIds,
        modalId: editId,
        openAddModal: startAdd,
        openEditModal: startUpdate,
        closeModal: endEdit,
        findTasks: findDataSource,
        addTask: addData,
        updateTask: updateData,
        deleteTask: deleteData,

        todoTasksIds,

        beginTime,
        setBeginTime,
        endTime,
        setEndTime,
        queryType,
        setQueryType,
        status,
        setStatus,
    };
};

const TasksContainer = createContainer(useTasks);

export default TasksContainer;
