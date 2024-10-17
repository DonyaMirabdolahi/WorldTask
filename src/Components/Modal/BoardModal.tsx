import React from 'react';

interface AddBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  boardName: string;
  setBoardName: React.Dispatch<React.SetStateAction<string>>;
}

const AddBoardModal: React.FC<AddBoardModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  boardName,
  setBoardName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 md:p-5 rounded-lg shadow-lg w-80 md:w-96"> 
        <h2 className="text-lg md:text-xl mb-3 md:mb-4">Enter your board name</h2> 
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full text-sm" 
          placeholder="Board Name"
        />
        <div className="flex justify-end mt-3 md:mt-4"> 
          <button onClick={onSubmit} className="bg-blue-500 text-white px-3 py-1 rounded text-sm"> 
            Create
          </button>
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-3 py-1 rounded ml-2 text-sm"> 
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBoardModal;
