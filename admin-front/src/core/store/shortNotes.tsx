/** @format */

import { useCallback, useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import {
    addShortNoteAsync,
    deleteShortNoteAsync,
    getShortNoteByIdAsync,
    updateShortNoteAsync,
} from '../services/shortNotes';
import { SortIds } from '../types/common';
import { ShortNotes, AddSortNoteProps, UpdateSortNoteProps } from '../types/shortNote';

const useShortNotes = () => {
    const [shortNotesData, setShortNotes] = useState<ShortNotes>({});

    const [shortNotesSortIds, setSortIds] = useState<SortIds>([]);

    // -1表示新增 >0表示编辑 null表示未打开弹框
    const [modalId, setModalId] = useState<number | null>(null);

    const getShortNotes = useCallback(async () => {
        const [data, shortIds] = await Promise.all([]);
        setShortNotes(data);
        setSortIds(shortIds);
    }, []);

    const addShortNote = useCallback(async (values: AddSortNoteProps) => {
        await addShortNoteAsync(values);
    }, []);

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

    const updateShortNote = useCallback(
        async (values: UpdateSortNoteProps) => {
            await updateShortNoteAsync(values);
            await getShortNoteById(values.id);
        },
        [getShortNoteById]
    );

    const deleteShortNote = useCallback(async () => {
        await deleteShortNoteAsync();
        await getShortNotes();
    }, [getShortNotes]);

    useEffect(() => {
        getShortNotes();
    }, [getShortNotes]);

    const openAddModal = useCallback(() => {
        setModalId(-1);
    }, []);

    const closeModal = useCallback(() => {
        setModalId(null);
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
    };
};

const ShortNotesContainer = createContainer(useShortNotes);

export default ShortNotesContainer;
