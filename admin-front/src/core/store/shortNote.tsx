/** @format */

import { createContainer } from 'unstated-next';
import useCurd from '../../shared/hooks/useCurd';
import {
    addShortNoteAsync,
    deleteShortNoteAsync,
    findShortNotesAsync,
    updateShortNoteAsync,
} from '../services/shortNote';
import { ShortNoteBase } from '../types/shortNote';

const sortName = 'shortNote';

const useShortNotes = () => {
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
    } = useCurd<ShortNoteBase>({
        findAllAsync: findShortNotesAsync,
        addAsync: addShortNoteAsync,
        updateAsync: updateShortNoteAsync,
        deleteAsync: deleteShortNoteAsync,
        sortName,
    });
    return {
        shortNotesData: dataSource,
        shortNotesSortIds: sortIds,
        modalId: editId,
        openAddModal: startAdd,
        openEditModal: startUpdate,
        closeModal: endEdit,
        findShortNotes: findDataSource,
        addShortNote: addData,
        updateShortNote: updateData,
        deleteShortNote: deleteData,
    };
};

const ShortNotesContainer = createContainer(useShortNotes);

export default ShortNotesContainer;
