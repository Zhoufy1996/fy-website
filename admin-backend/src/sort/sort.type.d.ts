export interface AddOneSortId {
  name: string;
  id: number;
}

export interface SaveProps {
  id?: number;
  name: string;
  content: number[];
}

export interface UpdateProps {
  name: string;
  content: number[];
}

export interface GetOneProps {
  name: string;
}

export interface DeleteOneSortId {
  name: string;
  id: number;
}
