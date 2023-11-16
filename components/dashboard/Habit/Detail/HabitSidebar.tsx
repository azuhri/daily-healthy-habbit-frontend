import Image from "next/image";
import HabitForm from "./HabitForm";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "@/redux/features/habitSidebar/habitSidebarSlice";

const HabitSidebar = ({ user }: { user: any }) => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state: any) => state.sidebar);

  return (
    <div
      className={`fixed flex justify-center items-center top-0 left-0 h-screen bg-gray-700 bg-opacity-70 z-30
      ${sidebar.isOpen ? "w-[100%] overflow-visible" : "w-0 overflow-hidden"}`}
    >
      <div
        className={`fixed top-0 right-0 h-screen bg-ds-gray rounded-l-lg transition-all duration-300 ease-in-out text-black ${
          sidebar.isOpen
            ? "w-[100%] md:w-[40%] overflow-visible"
            : "w-0 overflow-hidden"
        }`}
      >
        <button className="my-4 mx-4" onClick={() => dispatch(closeSidebar())}>
          <Image src="/icons/x-icon.svg" alt="X" width={20} height={0} />
        </button>
        <div className="h-full px-8 w-full">
          <HabitForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default HabitSidebar;
