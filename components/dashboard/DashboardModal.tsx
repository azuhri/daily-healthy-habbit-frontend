import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { closeModal } from "@/redux/features/modal/modalSlice";
import { useState } from "react";
import axios from "axios";
import { setHabits } from "@/redux/features/habits/habitsSlice";

const DashboardModal = ({ token }: { token: string }) => {
  const dispatch = useAppDispatch();
  const modal = useSelector((state: any) => state.modal);
  const { date } = useSelector((state: any) => state.time);
  const [progress, setProgress] = useState(0);
  const API =
    process.env.API || "https://staging-api-health2023.agileteknik.com";
  const access_token = `Bearer ${token}`;

  const handleButtonClick = () => {
    handleProgress();
  };

  const handleProgress = async () => {
    try {
      const url = `${API}/api/v2/habbit/progress/${modal.id}?date=${date}`;
      const config = {
        headers: {
          Authorization: `${access_token}`,
        },
      };
      const response = await axios.post(
        url,
        { total_progress: progress },
        config
      );
      if (response.status == 200) {
        axios.get(`${API}/api/v2/user?date=${date}`, config).then((res) => {
          dispatch(
            setHabits(res.data.data.sort((a: any, b: any) => b.id - a.id))
          );
        });
        dispatch(closeModal());
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat update progress:", error);
    }
  };

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-gray-700 bg-opacity-70 z-40">
      <div className="rounded-lg z-50 bg-white bg-opacity-100 text-black w-56 px-8 py-4">
        <p className="text-center text-black font-semibold mb-4">
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
        <p className="text-center text-black text-xs mt-4">
          Lakukan progress habit
        </p>
        <div className="flex justify-between font-semibold mt-4 mx-3">
          <p
            className="text-red-600 cursor-pointer"
            onClick={() => dispatch(closeModal())}
          >
            Batal
          </p>
          <p
            className="text-primary-100 cursor-pointer"
            onClick={handleButtonClick}
          >
            Simpan
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
