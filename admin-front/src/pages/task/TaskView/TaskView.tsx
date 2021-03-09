/** @format */
import { Button, DatePicker, Select } from 'antd';
import React from 'react';
import TasksContainer, { QUERYTYPE } from '../../../core/store/task';
import EditTask from '../EditTask/EditTask';
import TasksList from '../TasksList/TasksList';

const TaskView = () => {
    const {
        beginTime,
        setBeginTime,
        endTime,
        setEndTime,
        queryType,
        setQueryType,
        openAddModal,

        modalId,
    } = TasksContainer.useContainer();
    return (
        <div>
            <div>
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
            </div>
            <div>
                <Button onClick={openAddModal}>新增</Button>
            </div>
            <TasksList />
            {modalId && <EditTask />}
        </div>
    );
};

export default TaskView;
