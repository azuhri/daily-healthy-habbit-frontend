import { StaticTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import $ from "jquery";

import { useAppDispatch } from "@/redux/store";
import { closeSidebar } from "@/redux/features/habitSidebar/habitSidebarSlice";
import {
  createHabit,
  deleteHabit,
  setHabits,
  updateHabit,
} from "@/redux/features/habits/habitsSlice";
import { openModal } from "@/redux/features/modal/modalSlice";

const HabitForm = ({ user }: { user: any }) => {
  const dispatch = useAppDispatch();
  const { type, index } = useSelector((state: any) => state.sidebar);
  const { filteredHabits } = useSelector((state: any) => state.habits);
  const { date } = useSelector((state: any) => state.time);

  const [responseMessage, setResponseMessage] = useState("");
  const [bgColor, setBgColor] = useState("bg-[#E17055]");
  const [isTimepickerOpen, setIsTimepickerOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    filteredHabits[index]
      ? {
          id: filteredHabits[index].id,
          name: filteredHabits[index].name,
          description: filteredHabits[index].description
            ? filteredHabits[index].description
            : "",
          start_time: filteredHabits[index].start_time,
          target_perday: filteredHabits[index].target_perday
            ? filteredHabits[index].target_perday
            : 1,
          priority: filteredHabits[index].priority,
          color: filteredHabits[index].color,
          start_date: date,
        }
      : {
          id: null,
          name: "",
          description: "",
          start_time: null,
          target_perday: 1,
          priority: 1,
          color: 0,
          start_date: date,
        }
  );

  useEffect(() => {
    switch (inputValue.color) {
      case 0:
        setBgColor("bg-[#E17055]");
        break;
      case 1:
        setBgColor("bg-[#8373a0]");
        break;
      case 2:
        setBgColor("bg-[#46aab9]");
        break;
      case 3:
        setBgColor("bg-[#60a588]");
        break;
      case 4:
        setBgColor("bg-[#d58734]");
        break;
      case 5:
        setBgColor("bg-[#a5647c]");
        break;
      case 6:
        setBgColor("bg-[#4d9b9d]");
        break;
      case 7:
        setBgColor("bg-[#5686aa]");
        break;
      default:
        setBgColor("bg-[#E17055]");
        break;
    }
  }, [inputValue.color]);

  useEffect(() => {
    filteredHabits[index]
      ? setInputValue({
          id: filteredHabits[index].id,
          name: filteredHabits[index].name,
          description: filteredHabits[index].description
            ? filteredHabits[index].description
            : "",
          start_time: filteredHabits[index].start_time,
          target_perday: filteredHabits[index].target_perday
            ? filteredHabits[index].target_perday
            : 1,
          priority: filteredHabits[index].priority,
          color: filteredHabits[index].color,
          start_date: date,
        })
      : setInputValue({
          id: null,
          name: "",
          description: "",
          start_time: null,
          target_perday: 1,
          priority: 1,
          color: 0,
          start_date: date,
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredHabits[index]]);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const API =
        process.env.API || "https://staging-api-health2023.agileteknik.com";
      const access_token = `Bearer ${user.token}`;
      const config = {
        headers: {
          Authorization: `${access_token}`,
        },
      };
      let response;
      switch (e.nativeEvent.submitter.name) {
        // Kalo redux thunk gk bisa pake axios
        case "create":
          if (!inputValue.start_time) throw new Error("Pengingat belum diisi");

          // response = await axios.post(
          //   `${API}/api/v2/habbit`,
          //   { ...inputValue },
          //   config
          // );
          // break;

          response = dispatch(
            createHabit({ habit: inputValue, token: user.token })
          );
          break;
        case "edit":
          // const dataEdit = {
          //   ...inputValue,
          //   // TEMPORARY FIX NANTI DIHAPUS
          //   alarm_code: 1,
          // };
          // response = await axios.put(
          //   `${API}/api/v2/habbit/${filteredHabits[index].id}`,
          //   dataEdit,
          //   config
          // );

          response = dispatch(
            updateHabit({ habit: inputValue, access_token: user.token })
          );
          break;
        case "delete":
          // response = await axios.delete(
          //   `${API}/api/v2/habbit/${filteredHabits[index].id}`,
          //   config
          // );

          // response = dispatch(
          //   deleteHabit({
          //     id: filteredHabits[index].id,
          //     access_token: user.token,
          //   })
          // );

          dispatch(openModal({ type: "delete", id: filteredHabits[index].id }));
          break;
        default:
          throw new Error("Terjadi kesalahan");
      }

      const responseHabits = await axios.get(
        `${API}/api/v2/user?date=${date}`,
        config
      );
      dispatch(setHabits(responseHabits.data.data));
    } catch (error: any) {
      $("#responseMessage").html(`${error.message}`);
      $("#responseMessage").show(300);
      setTimeout(() => {
        $("#responseMessage").hide(300);
      }, 3000);
    }
  };

  const colorSelector = [];
  for (let i = 0; i < 8; i++) {
    let color = [
      "bg-[#E17055]",
      "bg-[#8373a0]",
      "bg-[#46aab9]",
      "bg-[#60a588]",
      "bg-[#d58734]",
      "bg-[#a5647c]",
      "bg-[#4d9b9d]",
      "bg-[#5686aa]",
    ];
    colorSelector.push(
      <button
        type="button"
        key={i}
        className={`rounded-lg text-black h-full ` + color[i]}
        onClick={() =>
          setInputValue({
            ...inputValue,
            color: i,
          })
        }
      >
        <p className="invisible">0</p>
      </button>
    );
  }

  const displayNone = {
    display: "none",
  };

  return (
    <form className="pt-8" onSubmit={handleSubmit}>
      <div
        id="responseMessage"
        style={displayNone}
        className="border-red-500 text-red-400 bg-red-200 mt-2 text-center p-3 border rounded-lg font-bold"
      />
      <div className="bg-white w-full rounded-lg py-2 px-3">
        <p className="text-primary-100">Nama Habit</p>
        <input
          required
          type="text"
          className="w-full border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda"
          value={inputValue.name}
          onChange={(e) =>
            setInputValue({ ...inputValue, name: e.target.value })
          }
        />
      </div>
      <div className="bg-white w-full rounded-lg py-2 px-3 my-2">
        <p className="text-primary-100">Deskripsi (Opsional)</p>
        <input
          type="text"
          className="w-full border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda"
          value={inputValue.description}
          onChange={(e) => {
            setInputValue({ ...inputValue, description: e.target.value });
          }}
        />
      </div>
      <div
        className="cursor-pointer text-primary-100 group flex justify-between w-full bg-white rounded-lg py-2 px-3 my-2"
        onClick={() => setIsTimepickerOpen(!isTimepickerOpen)}
      >
        <p className="">Pengingat</p>
        <div className="flex gap-2">
          {inputValue.start_time}
          <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
            +
          </div>
        </div>
      </div>
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          isTimepickerOpen ? "h-96 my-2" : "h-0 invisible"
        } overflow-hidden`}
      >
        <StaticTimePicker
          value={moment(inputValue.start_time, "HH:mm")}
          onChange={(newValue) => {
            setInputValue({
              ...inputValue,
              start_time: moment(newValue).format("HH:mm"),
            });
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="group relative text-black">
          <button
            type="button"
            className="group flex justify-between w-full bg-white rounded-lg py-2 px-3"
          >
            <p className="text-primary-100">Perulangan</p>
            <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
              {inputValue.target_perday}
            </div>
          </button>
          <div className="absolute right-0 invisible w-56 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-20">
            <div className="bg-white rounded-lg w-full h-24 mx-auto flex justify-between items-center px-4">
              <button
                type="button"
                className="bg-primary-100 rounded-lg px-2 text-white"
                onClick={() => {
                  if (inputValue.target_perday > 1)
                    setInputValue({
                      ...inputValue,
                      target_perday: inputValue.target_perday - 1,
                    });
                }}
              >
                -
              </button>
              <div className="bg-primary-100 rounded-lg px-2 text-white">
                {inputValue.target_perday}
              </div>
              <button
                type="button"
                className="bg-primary-100 rounded-lg px-2 text-white"
                onClick={() => {
                  setInputValue({
                    ...inputValue,
                    target_perday: inputValue.target_perday + 1,
                  });
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="group relative text-black">
          <button
            type="button"
            className="group flex justify-between w-full bg-white rounded-lg py-2 px-3"
          >
            <p className="text-primary-100">Prioritas</p>
            <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
              {inputValue.priority}
            </div>
          </button>
          <div className="absolute right-0 invisible w-56 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-20">
            <div className="bg-white rounded-lg w-full h-24 mx-auto flex justify-between items-center px-4">
              <button
                type="button"
                className="bg-primary-100 rounded-lg px-2 text-white"
                onClick={() => {
                  if (inputValue.priority > 1)
                    setInputValue({
                      ...inputValue,
                      priority: inputValue.priority - 1,
                    });
                }}
              >
                -
              </button>
              <div className="bg-primary-100 rounded-lg px-2 text-white">
                {inputValue.priority}
              </div>
              <button
                type="button"
                className="bg-primary-100 rounded-lg px-2 text-white"
                onClick={() =>
                  setInputValue({
                    ...inputValue,
                    priority: inputValue.priority + 1,
                  })
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="group relative text-black">
        <button
          className="group flex justify-between w-full bg-white rounded-lg py-2 px-3 my-2"
          type="button"
        >
          <p className="text-primary-100">Warna</p>
          <div className={`h-full rounded-lg px-2 text-white ${bgColor}`}>
            <p className="invisible">0</p>
          </div>
        </button>
        <div className="absolute inset-0 invisible w-full flex justify-center top-10">
          <div className="w-56 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-20">
            <div className="bg-white rounded-lg w-full h-24 mx-auto grid grid-cols-4 items-center px-4 py-4 gap-2">
              {colorSelector}
            </div>
          </div>
        </div>
      </div>
      {type === "create" && (
        <div className="w-full flex justify-center">
          <button
            type="submit"
            name="create"
            className="my-8 py-2 bg-primary-100 rounded-full w-[70%] text-xl font-bold text-white hover:bg-primary-hover"
          >
            Buat
          </button>
        </div>
      )}
      {type === "edit" && (
        <>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              name="edit"
              className="my-2 mt-6 py-2 bg-primary-100 rounded-full w-[70%] text-xl font-bold text-white hover:bg-primary-hover"
            >
              Edit
            </button>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              name="delete"
              className="my-2 py-2 bg-danger-100 rounded-full w-[70%] text-xl font-bold text-white hover:bg-danger-hover"
            >
              Hapus
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default HabitForm;
