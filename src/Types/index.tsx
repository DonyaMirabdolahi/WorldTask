export interface ITag {
  title: string;
  bg: string;
  text: string;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  deadline: number;
  image: string;
  alt: string;
  tags: ITag[];
  assign?: string;
}

export interface IColumn {
  name: string;
  items: ITask[];
}

export interface IBoard {
  id: string;
  name: string;
  columns: Record<string, IColumn>;
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  boards: IBoard[];
}


declare module 'react-beautiful-dnd';
