import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { closeModal } from "@/redux/features/modal/modalSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { setHabits } from "@/redux/features/habits/habitsSlice";
import { useRouter } from "next/router";
import $ from "jquery";
import Cookies from "js-cookie";

const DashboardModal = ({ user }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const modal = useSelector((state: any) => state.modal);
  const { filteredHabits } = useSelector((state: any) => state.habits);
  const { date } = useSelector((state: any) => state.time);
  const [progress, setProgress] = useState(0);
  const [inputValueProfile, setInputValueProfile] = useState({
    name: user.name,
    email: user.email,
  });
  const [inputValueGuestRegister, setInputValueGuestRegister] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (modal.type === "progress") {
      const habit = filteredHabits.find((habit: any) => habit.id === modal.id);
      setProgress(habit.progress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  const displayNone = {
    display: "none",
  };

  const API =
    process.env.API || "https://staging-api-health2023.agileteknik.com";
  const access_token = `Bearer ${user.token}`;

  const handleButtonClick = () => {
    switch (modal.type) {
      case "progress":
        handleProgress();
        break;
      case "profile":
        handleProfile();
        break;
      case "registerGuest":
        handleRegisterGuest();
        break;
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
      showError(error);
    }
  };

  const handleProfile = async () => {
    try {
      const url = `/api/update-profile`;
      const response = await axios.put(url, inputValueProfile);
      if (response.status == 200) {
        dispatch(closeModal());
      }
      setTimeout(() => {
        router.reload();
      }, 2000);
    } catch (error) {
      showError(error);
    }
  };

  const handleRegisterGuest = async () => {
    try {
      const url = `/api/register`;
      const response = await axios.post(url, {
        isGuest: true,
        id: user.id,
        name: inputValueGuestRegister.name,
        email: inputValueGuestRegister.email,
        password: inputValueGuestRegister.password,
        password_confirmation: inputValueGuestRegister.password_confirmation,
      });
      if (response.status == 200) {
        dispatch(closeModal());
        Cookies.remove("guest_id");
      }
      setTimeout(() => {
        router.reload();
      }, 2000);
    } catch (error) {
      showError(error);
    }
  };

  const showError = (error: any) => {
    $("#responseMessage").html(`${error.response.data.message}`);
    $("#responseMessage").show(300);
    setTimeout(() => {
      $("#responseMessage").hide(300);
    }, 3000);
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
            <div
              id="responseMessage"
              style={displayNone}
              className="border-red-500 text-red-400 bg-red-200 mt-2 text-center p-3 border rounded-lg font-bold"
            ></div>
            <form className="flex flex-col gap-2 pt-2">
              <div className="flex justify-between bg-white rounded-lg items-center px-4">
                <label className="font-semibold">Nama</label>
                <input
                  required
                  type="text"
                  className="w-[50%] text-center border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                  placeholder="Nama"
                  value={inputValueProfile.name}
                  onChange={(e) =>
                    e.target.value.length < 50 &&
                    setInputValueProfile({
                      ...inputValueProfile,
                      name: e.target.value,
                    })
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
                  value={inputValueProfile.email}
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
        {modal.type === "registerGuest" && (
          <>
            <p className="text-center text-lg font-semibold">Profil</p>
            <div
              id="responseMessage"
              style={displayNone}
              className="border-red-500 text-red-400 bg-red-200 mt-2 text-center p-3 border rounded-lg font-bold"
            ></div>
            <form className="flex flex-col gap-2 pt-2">
              <div className="flex justify-between bg-white rounded-lg items-center px-4">
                <label className="font-semibold">Nama</label>
                <input
                  required
                  type="text"
                  className="w-[50%] text-center border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                  placeholder="Nama"
                  value={inputValueGuestRegister.name}
                  onChange={(e) =>
                    e.target.value.length < 50 &&
                    setInputValueGuestRegister({
                      ...inputValueGuestRegister,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-between bg-white rounded-lg items-center px-4">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  className="w-[50%] text-center border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                  placeholder="Email"
                  value={inputValueGuestRegister.email}
                  onChange={(e) =>
                    setInputValueGuestRegister({
                      ...inputValueGuestRegister,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-between bg-white rounded-lg items-center px-4">
                <label className="font-semibold">Password</label>
                <input
                  type="password"
                  className="w-[50%] text-center border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                  placeholder="Password"
                  value={inputValueGuestRegister.password}
                  onChange={(e) =>
                    setInputValueGuestRegister({
                      ...inputValueGuestRegister,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-between bg-white rounded-lg items-center px-4">
                <label className="font-semibold">Konfirmasi Password</label>
                <input
                  type="password"
                  className="w-[50%] text-center border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                  placeholder="Konfirmasi Password"
                  value={inputValueGuestRegister.password_confirmation}
                  onChange={(e) =>
                    setInputValueGuestRegister({
                      ...inputValueGuestRegister,
                      password_confirmation: e.target.value,
                    })
                  }
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
