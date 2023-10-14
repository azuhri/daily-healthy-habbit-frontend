import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { closeModal } from "@/redux/features/modal/modalSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { setHabits } from "@/redux/features/habits/habitsSlice";
import { useRouter } from "next/router";

const DashboardModal = ({ user }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const modal = useSelector((state: any) => state.modal);
  const { filteredHabits } = useSelector((state: any) => state.habits);
  const { date } = useSelector((state: any) => state.time);
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState({
    name: user.name,
    email: user.email,
  });

  useEffect(() => {
    if (modal.type === "progress") {
      const habit = filteredHabits.find((habit: any) => habit.id === modal.id);
      setProgress(habit.progress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  const API =
    process.env.API || "https://staging-api-health2023.agileteknik.com";
  const access_token = `Bearer ${user.token}`;

  const handleButtonClick = () => {
    if (modal.type === "progress") {
      handleProgress();
    }
    if (modal.type === "profile") {
      handleProfile();
    }
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

  const handleProfile = async () => {
    try {
      const url = `/api/update-profile`;
      const response = await axios.put(url, inputValue);
      if (response.status == 200) {
        dispatch(closeModal());
      }
      setTimeout(() => {
        router.reload();
      }, 2000);
    } catch (error) {
      console.error("Terjadi kesalahan saat update profile:", error);
    }
  };

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-gray-700 bg-opacity-70 z-40">
      <div className="rounded-lg z-50 bg-gray-200 bg-opacity-100 text-black w-fit px-8 py-4">
        {modal.type === "progress" && (
          <div className="px-6">
            <p className="text-center text-black font-semibold mb-4">
              Progress Habit
            </p>
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="ring-1 ring-primary-100 rounded-lg px-2 mx-1 text-black"
                onClick={() => {
                  if (progress > 0) {
                    setProgress(progress - 1);
                  }
                }}
              >
                -
              </button>
              <input
                type="text"
                className="bg-transparent text-center w-8 h-4 border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                placeholder="00"
                value={progress}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    isNaN(Number(e.target.value)) ||
                    e.target.value.length < 2
                  ) {
                    setProgress(0);
                  } else {
                    // if input value is more than 100, set progress to 100
                    if (Number(e.target.value) > 99) {
                      return;
                    } else {
                      setProgress(Number(e.target.value));
                    }
                  }
                }}
              />
              <button
                type="button"
                className="bg-primary-100 rounded-lg px-2 mx-1 text-white"
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
          </div>
        )}
        {modal.type === "profile" && (
          <>
            <p className="text-center text-lg font-semibold">Profil</p>
            <form className="flex flex-col gap-2 pt-2">
              <div className="flex justify-between bg-white rounded-lg items-center px-4">
                <label className="font-semibold">Nama</label>
                <input
                  required
                  type="text"
                  className="w-[50%] text-center border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                  placeholder="Nama"
                  value={inputValue.name}
                  onChange={(e) =>
                    e.target.value.length < 50 &&
                    setInputValue({ ...inputValue, name: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-between bg-white rounded-lg items-center px-4">
                <label className="font-semibold">Email</label>
                <input
                  disabled
                  type="email"
                  className="w-[50%] disabled:text-gray-300 text-center border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                  placeholder="Email"
                  value={inputValue.email}
                />
              </div>
              <div className="flex justify-between bg-white rounded-lg items-center px-4">
                <label className="font-semibold">Password</label>
                <input
                  disabled
                  type="password"
                  className="w-[50%] disabled:text-gray-300 text-center border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                  placeholder="Password"
                  value={"**********"}
                />
              </div>
            </form>
          </>
        )}
        <div className="flex justify-between text-center font-semibold mt-4 mx-3">
          <p
            className="text-red-600 cursor-pointer w-full"
            onClick={() => dispatch(closeModal())}
          >
            Batal
          </p>
          <p
            className="text-primary-100 cursor-pointer w-full"
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
