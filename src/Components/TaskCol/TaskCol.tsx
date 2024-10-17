import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { IoAddOutline } from 'react-icons/io5';
import Task from '../../Components/Navbar/Task';
import AddModal from '../../Components/Modal/Addmodal';
import { onDragEnd } from '../../Helpers/onDragEnd/index';
import { IBoard, IColumn, ITask } from '../../Types/index';

interface TaskColProps {
  columns: Record<string, IColumn>;
  setColumns: React.Dispatch<React.SetStateAction<Record<string, IColumn>>>;
  board: IBoard;
  boards: IBoard[];
  setBoards: React.Dispatch<React.SetStateAction<IBoard[]>>;
}

const TaskCol = ({
  columns,
  setColumns,
  board,
  boards,
  setBoards,
}: TaskColProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('');

  const openModal = (columnId: string) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = async (taskData: ITask) => {
    const newColumns = { ...columns };
    newColumns[selectedColumn].items.push(taskData);

    setColumns(newColumns);

    const updatedBoards = boards.map((b) =>
      b.id === board.id ? { ...b, columns: newColumns } : b
    );

    setBoards(updatedBoards);

    await updateBoardInDatabase(updatedBoards);
    closeModal();
  };

  const handleDeleteTask = async (columnId: string, taskId: string) => {
    const newColumns = { ...columns };
    newColumns[columnId].items = newColumns[columnId].items.filter(
      (task) => task.id !== taskId
    );

    setColumns(newColumns);

    const updatedBoards = boards.map((b) =>
      b.id === board.id ? { ...b, columns: newColumns } : b
    );

    setBoards(updatedBoards);

    await updateBoardInDatabase(updatedBoards);
  };

  const updateBoardInDatabase = async (updatedBoards: IBoard[]) => {
    try {
      const response = await fetch(`http://localhost:3000/users/4710`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boards: updatedBoards,
        }),
      });

      if (!response.ok) throw new Error('Failed to update board');
      console.log('Board updated successfully!');
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  const handleUpdateTask = async (updatedTask: ITask, columnId: string) => {
    const newColumns = { ...columns };
    const columnItems = newColumns[columnId].items.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    newColumns[columnId].items = columnItems;

    setColumns(newColumns);

    const updatedBoards = boards.map((b) =>
      b.id === board.id ? { ...b, columns: newColumns } : b
    );

    setBoards(updatedBoards);

    await updateBoardInDatabase(updatedBoards);
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result: DropResult) =>
          onDragEnd(result, columns, setColumns)
        }
      >
        <div className="w-full flex flex-col md:flex-row items-start justify-between px-5 pb-8 gap-5 md:gap-7">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              className="flex flex-col gap-0 md:w-[320px] w-full max-w-[600px] mb-4"
              key={columnId}
            >
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col w-full gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    {column.items.map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="md:w-[320px] w-full"
                            style={{ minHeight: '100px' }}
                          >
                            <Task
                              provided={provided}
                              task={task}
                              handleDeleteTask={(taskId) =>
                                handleDeleteTask(columnId, taskId)
                              }
                              handleUpdateTask={(updatedTask) =>
                                handleUpdateTask(updatedTask, columnId)
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div
                onClick={() => openModal(columnId)}
                className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[320px] w-full max-w-[600px] opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px] mt-2"
              >
                <IoAddOutline color={'#555'} />
                Add Task
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />
    </>
  );
};

export default TaskCol;
