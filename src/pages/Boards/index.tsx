import React, { useState, useEffect } from 'react';
import Sidebar from '../../Sidebar/index';
import Navbar from '../../Components/Navbar';
import Modal from '../../Components/Modal/BoardModal';
import { v4 as uuidv4 } from 'uuid';
import TaskCol from '../../Components/TaskCol/TaskCol';
import {  IUser } from '../../Types';
import { IBoard } from '../../Types';

const Boards: React.FC = () => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [boardName, setBoardName] = useState<string>('');
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);
  const currentUserId = '4710';

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch('http://localhost:3000/users');
      const data: IUser[] = await response.json();
      const currentUser = data.find((user) => user.id === currentUserId);
      if (currentUser) {
        setBoards(currentUser.boards);
      }
    };
    fetchBoards();
  }, []);

  const addBoard = async () => {
    if (boardName.trim()) {
      const newBoard: IBoard = {
        id: uuidv4(),
        name: boardName,
        columns: {
          'column-1': { name: 'To Do', items: [] },
          'column-2': { name: 'In Progress', items: [] },
          'column-3': { name: 'Done', items: [] },
        },
      };
      const updatedBoards = [...boards, newBoard];

      await fetch(`http://localhost:3000/users/${currentUserId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boards: updatedBoards }),
      });

      setBoards(updatedBoards);
      setBoardName('');
      setIsModalOpen(false);
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    const updatedBoards = boards.filter((board) => board.id !== boardId);

    await fetch(`http://localhost:3000/users/${currentUserId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ boards: updatedBoards }),
    });

    setBoards(updatedBoards);
    setSelectedBoard(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSelectBoard = (board: IBoard) => {
    setSelectedBoard(board);
  };

  const handleSelectHome = () => {
    setSelectedBoard(null);
  };

  return (
    <div className="w-screen h-screen relative">
      <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-full h-full overflow-y-auto flex">
        <Sidebar
          boards={boards}
          onSelectBoard={handleSelectBoard}
          onSelectHome={handleSelectHome}
          handleDeleteBoard={handleDeleteBoard}
        />
        <div className="flex-1">
          <Navbar openModal={openModal} />
          <div className="p-5">
            {selectedBoard ? (
              <div className="border p-4 m-2 text-white text-[20px] rounded-lg md:text-[25px] relative">
                <div className="backdrop-blur-sm bg-white/30 absolute top-0 left-0 right-0 bottom-0 z-[-1] rounded-lg" />
                <div>Board Name: {selectedBoard.name}</div>
                {selectedBoard.columns && (
                  <TaskCol
                    board={selectedBoard}
                    columns={selectedBoard.columns}
                    boards={boards}
                    setBoards={setBoards}
                    setColumns={(prevColumns) => ({
                      ...prevColumns,
                      ...selectedBoard.columns,
                    })}
                  />
                )}
              </div>
            ) : (
              <div className="text-white">
                Please select a board to view its details.
              </div>
            )}
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={addBoard}
            boardName={boardName}
            setBoardName={setBoardName}
          />
        </div>
      </div>
    </div>
  );
};

export default Boards;


