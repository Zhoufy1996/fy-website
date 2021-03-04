/** @format */

export interface ShortNote {
    id: number;
    title: string;
    content: string;
    keywords: string[];
    createdAt: string;
    updatedAt: string;
}

export interface ShortNotes {
    [key: number]: ShortNote;
}

export interface GetShortNoteProps {
    id: number;
}

export interface AddSortNoteProps {
    title: string;
    content: string;
    keywords: string[];
}

export interface UpdateSortNoteProps extends AddSortNoteProps {
    id: number;
}
