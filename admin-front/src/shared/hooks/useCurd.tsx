/** @format */

import { useCallback, useEffect, useState } from 'react';
import { findSortIdsAsync } from '../../core/services/common';
import { AddFunc, DataBase, DataSource, DeleteFunc, FindAllFunc, SortIds, UpdateFunc } from '../../core/types/common';
import { transformArrToObj } from '../utils/transform';

interface UseCurdProps<T> {
    findAllAsync: FindAllFunc<T & DataBase>;
    addAsync: AddFunc<T>;
    updateAsync: UpdateFunc<T & { id: number }, T & DataBase>;
    deleteAsync: DeleteFunc;
    sortName: string;
}

/** @format */
const useCurd = <T,>({ findAllAsync, addAsync, updateAsync, deleteAsync, sortName }: UseCurdProps<T>) => {
    type Data = T & DataBase;

    const [dataSource, setDataSource] = useState<DataSource<Data>>({});

    const [sortIds, setSortIds] = useState<SortIds>([]);

    // -1新增 >0编辑 null无动作
    // 统一使用id
    const [editId, setEditId] = useState<number | null>(null);

    const startAdd = useCallback(() => {
        setEditId(-1);
    }, []);

    const startUpdate = useCallback((id: number) => {
        setEditId(id);
    }, []);

    const endEdit = useCallback(() => {
        setEditId(null);
    }, []);

    const findDataSource = useCallback(async () => {
        const [resData, resSortIds] = await Promise.all([findAllAsync(), findSortIdsAsync(sortName)]);

        setDataSource(transformArrToObj(resData));
        setSortIds(resSortIds);
    }, [findAllAsync, sortName]);

    const addData = useCallback(
        async (data: T) => {
            const res = await addAsync(data);
            endEdit();
            setDataSource((pre) => {
                return {
                    ...pre,
                    [res.id]: res,
                };
            });
            setSortIds((pre) => {
                return [...pre, res.id];
            });
        },
        [addAsync, endEdit]
    );

    const updateData = useCallback(
        async (data: T & { id: number }) => {
            const res = await updateAsync(data);
            endEdit();
            setDataSource((pre) => {
                return {
                    ...pre,
                    [res.id]: res,
                };
            });
        },
        [updateAsync, endEdit]
    );

    const deleteData = useCallback(
        async (id: number) => {
            await deleteAsync({ id });
            await findDataSource();
        },
        [deleteAsync, findDataSource]
    );

    useEffect(() => {
        findDataSource();
    }, [findDataSource]);

    return {
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
    };
};

export default useCurd;
