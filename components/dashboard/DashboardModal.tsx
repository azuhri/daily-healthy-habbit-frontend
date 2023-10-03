import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { closeModal } from "@/redux/features/modal/modalSlice";
import { useState } from "react";

const DashboardModal = ({ token }: { token: string }) => {
  const dispatch = useAppDispatch();
  const modal = useSelector((state: any) => state.modal);
  const { date } = useSelector((state: any) => state.time);
  const [progress, setProgress] = useState(0);
  const API =
    process.env.API || "https://staging-api-health2023.agileteknik.com";

  const handleButtonClick = () => {
    dispatch(closeModal());
  };

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-gray-700 bg-opacity-70 z-40">
      <div className="rounded-lg z-50 bg-white bg-opacity-100 text-black w-56 px-8 py-4">
        <p className="text-center text-primary-100 font-semibold mb-4">
          Progress Habit
        </p>
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="ring-1 ring-primary-100 rounded-lg px-2 text-black"
            onClick={() => {
              if (progress > 0) {
                setProgress(progress - 1);
              }
            }}
          >
            -
          </button>
          <div className="rounded-lg px-2 text-black">{progress}</div>
          <button
            type="button"
            className="bg-primary-100 rounded-lg px-2 text-white"
            onClick={() => {
              if (progress < 100) {
                setProgress(progress + 1);
              }
            }}
          >
            +
          </button>
        </div>
        <div className="flex justify-between font-semibold mt-4">
          <p className="text-red-600" onClick={() => dispatch(closeModal())}>
            Batal
          </p>
          <p className="text-primary-100" onClick={handleButtonClick}>
            OK
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
