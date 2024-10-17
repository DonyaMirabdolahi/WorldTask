import React from 'react'; 
import { CgAddR } from 'react-icons/cg';
import { IoNotificationsOutline, IoSearchOutline, IoSettingsOutline, IoShareSocialOutline } from 'react-icons/io5';

interface NavbarProps {
  openModal: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({ openModal }) => {
  return (
    <div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed z-40 flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff]">
      <div className="flex items-center gap-3 cursor-pointer">
        <div onClick={openModal} className='flex items-center gap-2 p-3 cursor-pointer rounded-lg '>
          <span className="text-orange-400 font-semibold md:text-lg text-sm whitespace-nowrap">
            New Board
          </span>
          <CgAddR color="#fb923c" width={"16px"} height={"16px"} />
        </div>
      </div>
      <div className="md:w-[800px] w-[130px] bg-gray-100 rounded-lg px-3 py-[10px] flex items-center gap-2 mx-2">
        <IoSearchOutline color={"#999"} />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-100 outline-none text-[15px] mx-3"
        />
      </div>
      <div className="md:flex hidden items-center gap-4">
        <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
          <IoShareSocialOutline color={"#444"} />
        </div>
        <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
          <IoSettingsOutline color={"#444"} />
        </div>
        <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
          <IoNotificationsOutline color={"#444"} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
