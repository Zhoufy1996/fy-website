/** @format */

import { useCallback, useState } from 'react';
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

    const [loading, setLoading] = useState<boolean>(false);

    const [spinning, setSpinning] = useState<boolean>(false);

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
        setSpinning(true);
        const [resData, resSortIds] = await Promise.all([findAllAsync({}), findSortIdsAsync(sortName)]);
        setSpinning(false);

        setDataSource(transformArrToObj(resData));
        setSortIds(resSortIds);
    }, [findAllAsync, sortName]);

    const addData = useCallback(
        async (data: T) => {
            setLoading(true);
            const res = await addAsync(data);
            setLoading(false);
            setDataSource((pre) => {
                return {
                    ...pre,
                    [res.id]: res,
                };
            });
            setSortIds((pre) => {
                return [...pre, res.id];
            });
            return res;
        },
        [addAsync]
    );

    const updateData = useCallback(
        async (data: T & { id: number }) => {
            setLoading(true);
            const res = await updateAsync(data);
            setLoading(false);
            setDataSource((pre) => {
                return {
                    ...pre,
                    [res.id]: res,
                };
            });
            return res;
        },
        [updateAsync]
    );

    const deleteData = useCallback(
        async (id: number) => {
            setLoading(true);
            await deleteAsync({ id });
            setLoading(false);
            await findDataSource();
        },
        [deleteAsync, findDataSource]
    );

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

        loading,
        spinning,
    };
};

export default useCurd;
