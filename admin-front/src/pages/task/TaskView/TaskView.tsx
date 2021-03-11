/** @format */
import { Button, DatePicker, Select } from 'antd';
import React from 'react';
import TasksContainer, { QUERYTYPE, Status } from '../../../core/store/task';
import SettingBtn from '../../../shared/components/SettingBtn/SettingBtn';
import EditTask from '../EditTask/EditTask';
import TasksList from '../TasksList/TasksList';
import TodoAlert from '../TodoAlert/TodoAlert';

const TaskView = () => {
    const {
        beginTime,
        setBeginTime,
        endTime,
        setEndTime,
        queryType,
        setQueryType,
        openAddModal,

        status,
        setStatus,
        modalId,
    } = TasksContainer.useContainer();

    return (
        <div>
            <SettingBtn
                overlay={
                    <div>
                        <Select value={status} onChange={setStatus}>
                            <Select.Option value={Status.UNDO}>未开始</Select.Option>
                            <Select.Option value={Status.DOING}>进行中</Select.Option>
                            <Select.Option value={Status.DONE}>已完成</Select.Option>
                        </Select>
                        <Select value={queryType} onChange={setQueryType}>
                            <Select.Option value={QUERYTYPE.BYWEEK}>按周</Select.Option>
                            <Select.Option value={QUERYTYPE.BYMONTH}>按月</Select.Option>
                            <Select.Option value={QUERYTYPE.BYCUSTOM}>自定义</Select.Option>
                        </Select>

                        {queryType === QUERYTYPE.BYWEEK ? (
                            <DatePicker.WeekPicker
                                value={beginTime}
                                onChange={(date) => {
                                    const begin = date ? date.clone().startOf('week') : null;
                                    const end = date ? date.clone().endOf('week') : null;
                                    setBeginTime(begin);
                                    setEndTime(end);
                                }}
                            />
                        ) : null}
                        {queryType === QUERYTYPE.BYMONTH ? (
                            <DatePicker.MonthPicker
                                value={beginTime}
                                onChange={(date) => {
                                    const begin = date ? date.clone().startOf('month') : null;
                                    const end = date ? date.clone().endOf('month') : null;
                                    setBeginTime(begin);
                                    setEndTime(end);
                                }}
                            />
                        ) : null}
                        {queryType === QUERYTYPE.BYMONTH ? (
                            <DatePicker.RangePicker
                                value={[beginTime, endTime]}
                                onChange={(date) => {
                                    const begin = date && date[0] ? date[0].clone().startOf('month') : null;
                                    const end = date && date[1] ? date[1].clone().endOf('month') : null;
                                    setBeginTime(begin);
                                    setEndTime(end);
                                }}
                            />
                        ) : null}
                        <div>
                            <Button onClick={openAddModal}>新增</Button>
                        </div>
                    </div>
                }
            />

            <TasksList />
            <TodoAlert />
            {modalId && <EditTask />}
        </div>
    );
};

export default TaskView;
