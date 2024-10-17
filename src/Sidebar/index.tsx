import { IoAppsOutline, IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { BiTrash } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { MdTask } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IBoard } from '../Types';

interface SidebarProps {
  boards: IBoard[];
  onSelectBoard: (board: IBoard) => void;
  onSelectHome: () => void;
  handleDeleteBoard: (boardId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  boards = [],
  onSelectBoard,
  onSelectHome,
  handleDeleteBoard,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navLinks = [
    {
      title: 'Person',
      icon: <BsPersonCircle color="#555" width="22px" height="22px" />,
      onClick: onSelectHome,
    },
    {
      title: 'Boards',
      icon: <IoAppsOutline color="#555" width="22px" height="22px" />,
      active: true,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarElement = document.getElementById('sidebar');
      if (sidebarElement && !sidebarElement.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      id="sidebar"
      className={`fixed left-0 top-0 md:w-[230px] w-[60px] h-full flex flex-col bg-white shadow-lg transition-all duration-300 ${
        isOpen ? '!w-[230px]' : 'w-[60px]'
      } z-50`}
    >
      <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
        <span className="text-orange-400 font-semibold text-2xl md:block hidden">
          World Task
        </span>
        <span className="text-orange-400 font-semibold text-2xl md:hidden block">
          WT
        </span>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-center bg-gray-200 p-2 mx-3 rounded-lg"
      >
        <GiHamburgerMenu color="#555" width="22px" height="22px" />
      </button>
      <div
        className={`w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative ${
          isOpen ? 'block' : 'hidden md:block'
        }`}
      >
        {navLinks.map((link) => (
          <div
            key={link.title}
            className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer ${
              link.active ? 'bg-orange-300' : 'bg-transparent'
            }`}
            onClick={link.onClick}
          >
            {link.icon}
            <span className="font-medium text-[15px] md:block ">
              {link.title}
            </span>
          </div>
        ))}
        {boards.map((board) => (
          <div
            key={board.id}
            className="flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer"
            onClick={() => onSelectBoard(board)}
          >
            <MdTask className="text-gray-500" />
            <span
              className={`font-medium text-[15px] truncate whitespace-nowrap overflow-hidden max-w-[calc(100%-40px)] ${
                isOpen ? 'md:block' : 'hidden md:block'
              }`}
            >
              {board.name}
            </span>
            <button
              className="ml-auto text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteBoard(board.id);
              }}
            >
              <div className="mx-2">
                <BiTrash />
              </div>
            </button>
          </div>
        ))}
        <div
          className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200"
          onClick={handleLogout}
        >
          <IoLogOutOutline color="#555" width="22px" height="22px" />
          <span className="font-medium text-[15px] md:block hidden">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
