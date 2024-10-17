import { FaSpinner } from "react-icons/fa";

const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-black opacity-60 ">
    <FaSpinner className="text-4xl animate-spin text-orange-500" />
    <span className="ml-4 text-lg font-semibold text-orange-500">Loading...</span>
  </div>
);

export default Loading;
