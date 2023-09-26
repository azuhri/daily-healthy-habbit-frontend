import Image from "next/image";
import HabitForm from "./HabitForm";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "@/redux/features/habitSidebar/habitSidebarSlice";

const HabitSidebar = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state: any) => state.sidebar);

  return (
    <div className="w-screen">
      <div
        className={`fixed bottom-0 right-0 h-screen bg-ds-gray rounded-l-lg transition-all duration-300 ease-in-out text-black ${
          sidebar.isOpen ? "w-[35%] overflow-visible" : "w-0 overflow-hidden"
        }`}
      >
        <button className="my-4 mx-4" onClick={() => dispatch(closeSidebar())}>
          <Image src="/icons/x-icon.svg" alt="X" width={20} height={0} />
        </button>
        <div className="px-8 w-full mt-4">
          <h1 className="font-semibold text-xl">Definisikan Habitmu!</h1>
          {sidebar.type === "create" && (
            <HabitForm>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="my-8 py-2 bg-primary-100 rounded-full w-[70%] text-xl font-bold text-white hover:bg-primary-hover"
                >
                  Buat
                </button>
              </div>
            </HabitForm>
          )}
          {sidebar.type === "edit" && (
            <HabitForm>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="my-2 mt-6 py-2 bg-primary-100 rounded-full w-[70%] text-xl font-bold text-white hover:bg-primary-hover"
                >
                  Edit
                </button>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="my-2 py-2 bg-danger-100 rounded-full w-[70%] text-xl font-bold text-white hover:bg-danger-hover"
                >
                  Hapus
                </button>
              </div>
            </HabitForm>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitSidebar;
