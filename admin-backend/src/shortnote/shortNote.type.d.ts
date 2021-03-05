export interface AddProps {
  title: string;
  content: string;
  keywords: string[];
}

export interface UpdateProps extends AddProps {
  id: number;
}

export interface SaveProps extends AddProps {
  id?: number;
}

export interface DeleteProps {
  id: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FindProps {}

export interface FindOneProps {
  id: number;
}
