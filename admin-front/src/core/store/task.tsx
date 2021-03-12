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

enum TaskStatus {
    UNDO = 0,
    DOING = 50,
    DONE = 100,
}

interface Status {
    value: TaskStatus;
    name: string;
}

export const statusList: Status[] = [
    {
        value: TaskStatus.UNDO,
        name: '未开始',
    },
    {
        value: TaskStatus.DOING,
        name: '进行中',
    },
    {
        value: TaskStatus.DONE,
        name: '已完成',
    },
];

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

        loading,
    } = useCurd<TaskBase>({
        findAllAsync: findTasksAsync,
        addAsync: addTaskAsync,
        updateAsync: updateTaskAsync,
        deleteAsync: deleteTaskAsync,
        sortName,
    });

    const [beginTime, setBeginTime] = useState<Moment | null>(null);
    const [endTime, setEndTime] = useState<Moment | null>(null);
    const [status, setStatus] = useState<TaskStatus>(TaskStatus.UNDO);

    const [queryType, setQueryType] = useState<QUERYTYPE>(QUERYTYPE.BYWEEK);

    const tasksDataIds = useMemo(() => {
        return sortIds
            .filter((id) => {
                const item = dataSource[id];
                if (item) {
                    return item.progress === status;
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

        loading,
    };
};

const TasksContainer = createContainer(useTasks);

export default TasksContainer;
