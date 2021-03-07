/** @format */

import { useCallback, useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { transformArrToObj } from '../../shared/utils/transform';
import { getSortIdsAsync } from '../services/common';
import {
    addShortNoteAsync,
    deleteShortNoteAsync,
    getShortNoteByIdAsync,
    getShortNotesDataAsync,
    updateShortNoteAsync,
} from '../services/shortNotes';
import { SortIds } from '../types/common';
import { ShortNotes, AddSortNoteProps, UpdateSortNoteProps, ShortNote } from '../types/shortNote';

const sortName = 'shortNote';

const useShortNotes = () => {
    const [shortNotesData, setShortNotes] = useState<ShortNotes>({});

    const [shortNotesSortIds, setSortIds] = useState<SortIds>([]);

    const getShortNotes = useCallback(async () => {
        const [data, shortIds] = await Promise.all([getShortNotesDataAsync(), getSortIdsAsync(sortName)]);
        setShortNotes(transformArrToObj<ShortNote>(data));
        setSortIds(shortIds);
    }, []);

    useEffect(() => {
        getShortNotes();
    }, [getShortNotes]);

    // -1表示新增 >0表示编辑 null表示未打开弹框
    const [modalId, setModalId] = useState<number | null>(null);

    const getShortNoteById = useCallback(async (id: number) => {
        const res = await getShortNoteByIdAsync({ id });
        setShortNotes((pre) => {
            return {
                ...pre,
                [id]: res,
            };
        });
        setSortIds((pre) => {
            if (!pre.includes(id)) {
                return [...pre, id];
            }
            return pre;
        });
    }, []);

    const closeModal = useCallback(() => {
        setModalId(null);
    }, []);

    const addShortNote = useCallback(
        async (values: AddSortNoteProps) => {
            const res = await addShortNoteAsync(values);
            closeModal();
            getShortNoteById(res.id);
        },
        [closeModal, getShortNoteById]
    );

    const updateShortNote = useCallback(
        async (values: UpdateSortNoteProps) => {
            const res = await updateShortNoteAsync(values);
            closeModal();
            getShortNoteById(res.id);
        },
        [closeModal, getShortNoteById]
    );

    const deleteShortNote = useCallback(
        async (id: number) => {
            await deleteShortNoteAsync(id);
            await getShortNotes();
        },
        [getShortNotes]
    );

    useEffect(() => {
        getShortNotes();
    }, [getShortNotes]);

    const openAddModal = useCallback(() => {
        setModalId(-1);
    }, []);

    const openEditModal = useCallback((id: number) => {
        setModalId(id);
    }, []);

    return {
        shortNotesData,
        shortNotesSortIds,
        modalId,
        addShortNote,
        updateShortNote,
        deleteShortNote,
        openAddModal,
        closeModal,
        openEditModal,
    };
};

const ShortNotesContainer = createContainer(useShortNotes);

export default ShortNotesContainer;
