import { DropResult } from 'react-beautiful-dnd';
import { IColumn } from '../../Types';

export const onDragEnd = (
  result: DropResult,
  columns: Record<string, IColumn>,
  setColumns: React.Dispatch<React.SetStateAction<Record<string, IColumn>>>
) => {
  const { source, destination } = result;

  if (!destination) return;

  const sourceCol = columns[source.droppableId];
  const destCol = columns[destination.droppableId];
  const [removed] = sourceCol.items.splice(source.index, 1);

  if (source.droppableId === destination.droppableId) {
    sourceCol.items.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: sourceCol,
    });
  } else {
    destCol.items.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });
  }
};
