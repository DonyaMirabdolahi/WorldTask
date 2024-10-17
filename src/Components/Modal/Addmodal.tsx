import React, { useState } from 'react';
import { getRandomColors } from '../../Helpers/GetRandomColor';
import { v4 as uuidv4 } from 'uuid';
import { ITag, ITask } from '../../Types';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask: (taskData: ITask) => Promise<void>;
}

const AddModal = ({
  isOpen,
  onClose,
  setOpen,
  handleAddTask,
}: AddModalProps) => {
  const initialTaskData: ITask = {
    id: uuidv4(),
    title: '',
    description: '',
    priority: 'low',
    deadline: 0,
    image: '',
    alt: '',
    tags: [],
  };

  const [taskData, setTaskData] = useState<ITask>(initialTaskData);
  const [tagTitle, setTagTitle] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'deadline' && Number(value) < 0) {
      return;
    }

    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setTaskData({ ...taskData, image: e.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagTitle.trim() !== '') {
      const { bg, text } = getRandomColors();
      const newTag: ITag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle('');
    }
  };

  const closeModal = () => {
    setOpen(false);
    onClose();
    setTaskData(initialTaskData);
  };

  const handleSubmit = () => {
    handleAddTask(taskData);
    closeModal();
  };

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 z-50 ${
        isOpen ? 'grid' : 'hidden'
      }`}
    >
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20 pointer-events-auto"
        onClick={closeModal}
      ></div>
      <div className="max-w-xs md:max-w-[30vw] w-[95%] md:w-[90%] h-[80%] md:h-auto bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-2 px-4 py-4 pointer-events-auto">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-8 md:h-10 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium text-gray-400"
        />
        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-8 md:h-10 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium text-gray-400"
        />
        <select
          name="priority"
          onChange={handleChange}
          value={taskData.priority}
          className="w-full h-8 md:h-10 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium text-gray-400 "
        >
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="number"
          name="deadline"
          value={taskData.deadline}
          onChange={handleChange}
          placeholder="Deadline"
          className="w-full h-8 md:h-10 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium text-gray-400"
        />
        <input
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
          placeholder="Tag Title"
          className="w-full h-8 md:h-10 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm text-gray-400"
        />
        <button
          className="w-full rounded-md h-8 md:h-10 bg-slate-500 text-amber-50 font-normal"
          onClick={handleAddTag}
        >
          Add Tag
        </button>
        <div className="w-full text-gray-400 text-lg">
          {taskData.tags.length > 0 && <span>Tags:</span>}
          {taskData.tags.map((tag, index) => (
            <div
              key={index}
              className="inline-block mx-1 px-2 py-1 text-[12px] font-medium rounded-md"
              style={{ backgroundColor: tag.bg, color: tag.text }}
            >
              {tag.title}
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row w-full gap-2">
          <div className="w-full flex flex-col">
            <input
              type="text"
              name="alt"
              value={taskData.alt}
              onChange={handleChange}
              placeholder="Image Alt"
              className="w-full h-8 md:h-10 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm text-gray-600"
            />
            <span className="text-red-500 text-xs">
              If you choose a file, the alt text must be filled!
            </span>
          </div>
          <div className="w-full flex items-center justify-center">
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-2 text-sm rounded-md bg-slate-100 bg-none text-gray-600"
            />
          </div>
        </div>
        <button
          className="w-full mt-2 rounded-md h-8 md:h-10 bg-orange-400 text-blue-50 font-normal"
          onClick={handleSubmit}
        >
          Submit Task
        </button>
      </div>
    </div>
  );
};

export default AddModal;
