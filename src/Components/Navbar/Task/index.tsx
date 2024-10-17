import { useState } from 'react';
import { IoTimeOutline, IoTrashOutline, IoCloseCircle } from 'react-icons/io5';
import { DraggableProvided } from 'react-beautiful-dnd';
import { ITask } from '../../../Types';

interface TaskProps {
  task: ITask;
  provided: DraggableProvided;
  handleDeleteTask: (taskId: string) => void;
  handleUpdateTask: (updatedTask: ITask) => void;
}

const Task = ({
  task,
  provided,
  handleDeleteTask,
  handleUpdateTask,
}: TaskProps) => {
  const {
    title,
    description,
    priority,
    deadline,
    image,
    alt,
    tags,
    id,
    assign,
  } = task;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const assignToList: string[] = [
    'John Doe',
    'Jane Smith',
    'Team Alpha',
    'Team Bravo',
    'Michael Brown',
    'Sara Johnson',
    'Emily Clark',
    'David Wilson',
  ];

  const handleAssign = (name: string) => {
    const updatedTask: ITask = { ...task, assign: name };
    handleUpdateTask(updatedTask);
    setIsDropdownOpen(false);
  };

  const handleRemoveAssign = () => {
    const updatedTask: ITask = { ...task };
    delete updatedTask.assign;
    handleUpdateTask(updatedTask);
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-white flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
    >
      {image && alt && (
        <>
          <img src={image} alt={alt} className="w-full h-[170px] rounded-lg" />
          <span className="text-[18px] text-gray-500 mt-1">{alt}</span>
        </>
      )}
      <div className="flex items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag.title}
            className="px-[10px] py-[2px] text-[13px] font-medium rounded-md"
            style={{ backgroundColor: tag.bg, color: tag.text }}
          >
            {tag.title}
          </span>
        ))}
      </div>
      <div className="w-full flex items-start flex-col gap-0">
        <span className="text-[15.5px] font-medium text-[#555]">{title}</span>
        <span className="text-[13.5px] text-gray-500">{description}</span>
      </div>
      <div className="w-full border border-dashed"></div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <IoTimeOutline color={'#666'} width="19px" height="19px" />
          <span className="text-[13px] text-gray-700">{deadline} mins</span>
        </div>
        <div
          className={`w-[60px] rounded-full h-[5px] ${
            priority === 'high'
              ? 'bg-red-500'
              : priority === 'medium'
              ? 'bg-orange-500'
              : 'bg-blue-500'
          }`}
        ></div>
      </div>
      <div className="mt-2 w-full flex justify-between relative">
        <button
          onClick={() => handleDeleteTask(id)}
          className="text-red-500 text-[16px] hover:text-red-700 flex items-center gap-1"
        >
          <IoTrashOutline size={20} />
          <span>Delete</span>
        </button>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-blue-500 text-[16px] hover:text-blue-700"
          >
            Assign to ...
          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {assignToList.map((name) => (
                <li
                  key={name}
                  onClick={() => handleAssign(name)}
                  className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {assign && (
        <div className="mt-2 text-gray-600 text-sm flex items-center justify-between w-full">
          <span>
            Assigned to: <span className="font-semibold">{assign}</span>
          </span>
          <button
            onClick={handleRemoveAssign}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Remove assign"
          >
            <IoCloseCircle size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;
