import { StaticTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import $ from "jquery";
import Image from "next/image";

import { useAppDispatch } from "@/redux/store";
import {
  closeSidebar,
  openSidebar,
} from "@/redux/features/habitSidebar/habitSidebarSlice";
import { setHabits } from "@/redux/features/habits/habitsSlice";
import { openModal } from "@/redux/features/modal/modalSlice";
import CategoryButton from "./Buttons/CategoryButton";
import DayButton from "./Buttons/DayButton";
import DateButton from "./Buttons/DateButton";
import { createHabit, editHabit, getHabitByDate } from "../api";

const HabitForm = ({ user }: { user: any }) => {
  const dispatch = useAppDispatch();
  const sidebar = useSelector((state: any) => state.sidebar);
  const { habits, filteredHabits } = useSelector((state: any) => state.habits);
  const { date } = useSelector((state: any) => state.time);
  const isGuest = user.name === "Guest";

  const access_token = `Bearer ${user.token}`;
  const config = {
    headers: {
      Authorization: access_token,
    },
  };

  const [responseMessage, setResponseMessage] = useState("");
  const [isOpen, setIsOpen] = useState({
    timePicker: false,
    categoryPicker: false,
  });

  let category = [
    ["bg-[#60a588]", "Keagamaan", "/icons/kategori_keagamaan.svg"],
    ["bg-[#8373a0]", "Belajar", "/icons/kategori_belajar.png"],
    ["bg-[#5686aa]", "Liburan", "/icons/kategori_liburan.svg"],
    ["bg-[#a5647c]", "Sosial", "/icons/kategori_sosial.svg"],
    ["bg-[#4d9b9d]", "Hiburan", "/icons/kategori_hiburan.svg"],
    ["bg-[#d58734]", "Manajemen", "/icons/kategori_manajemen.svg"],
    ["bg-[#46aab9]", "Olahraga", "/icons/kategori_olahraga.svg"],
    ["bg-[#E17055]", "Lainnya", "/icons/kategori_lainnya.svg"],
  ];

  let days = [
    ["Sunday", "Minggu"],
    ["Monday", "Senin"],
    ["Tuesday", "Selasa"],
    ["Wednesday", "Rabu"],
    ["Thursday", "Kamis"],
    ["Friday", "Jumat"],
    ["Saturday", "Sabtu"],
  ];

  type InputValueType = {
    id: number;
    name: string;
    description: string;
    start_time: string;
    type: "daily" | "weekly" | "monthly" | "interval_day";
    target_perday: number;
    priority: number;
    color: number;
    start_date: moment.Moment;
    list_days: string[];
    list_dates: number[];
    interval_day: number;
    alarm_code: string;
  };

  const defaultInputValue: InputValueType = {
    id: -1,
    name: "",
    description: "",
    start_time: "00:00",
    type: "daily",
    target_perday: 1,
    priority: 0,
    color: 0,
    start_date: date,
    list_days: [],
    list_dates: [],
    interval_day: 1,
    alarm_code: "",
  };

  const getInitialState = (): InputValueType => {
    if (filteredHabits[sidebar.index]) {
      return {
        id: filteredHabits[sidebar.index].id,
        name: filteredHabits[sidebar.index].name,
        description: filteredHabits[sidebar.index].description || "",
        start_time: filteredHabits[sidebar.index].start_time,
        type: filteredHabits[sidebar.index].type,
        target_perday: filteredHabits[sidebar.index].target_perday || 1,
        priority: filteredHabits[sidebar.index].priority || 0,
        color: filteredHabits[sidebar.index].color,
        start_date: date,
        list_days: filteredHabits[sidebar.index].detail_parameter
          ? filteredHabits[sidebar.index].detail_parameter.split(",")
          : [],
        list_dates: filteredHabits[sidebar.index].detail_parameter
          ? filteredHabits[sidebar.index].detail_parameter
              .split(",")
              .map((item: any) => parseInt(item))
          : [],
        interval_day: filteredHabits[sidebar.index].interval_day || 1,
        alarm_code: filteredHabits[sidebar.index].alarm_code,
      };
    } else {
      return defaultInputValue;
    }
  };

  // inputValue is InputValueType
  const [inputValue, setInputValue] = useState<InputValueType>(
    getInitialState()
  );

  const resetState = () => {
    setInputValue(getInitialState());
    setIsOpen({ ...isOpen, timePicker: false, categoryPicker: false });
  };

  useEffect(() => {
    resetState();

    if (!filteredHabits[sidebar.index] && sidebar.type === "edit") {
      dispatch(closeSidebar());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredHabits[sidebar.index], sidebar.isOpen]);

  useEffect(() => {
    const resetFields = {
      daily: { list_days: [], list_dates: [], interval_day: 1 },
      weekly: { list_dates: [], interval_day: 1 },
      monthly: { list_days: [], interval_day: 1 },
      interval_day: { list_days: [], list_dates: [] },
    };

    if (resetFields[inputValue.type]) {
      setInputValue({ ...inputValue, ...resetFields[inputValue.type] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue.type]);

  const handleInvalidData = () => {
    if (!inputValue.start_time) throw new Error("Pengingat belum diisi");
    if (
      habits.some((habit: any) => habit.name === inputValue.name) &&
      (sidebar.type === "create" ||
        (sidebar.type === "edit" &&
          habits[sidebar.index].name !== inputValue.name))
    )
      throw new Error("Nama habit sudah ada");
    if (
      inputValue.type != "daily" &&
      inputValue.list_days.length < 1 &&
      inputValue.list_dates.length < 1 &&
      (inputValue.interval_day < 1 || inputValue.type != "interval_day")
    )
      throw new Error("Frekuensi belum diisi");
    if (inputValue.target_perday < 1)
      throw new Error("Target perhari tidak boleh kosong");
    if (inputValue.priority < 0)
      throw new Error("Prioritas tidak boleh kurang dari 0");
  };

  const handleDetailParameter = () => {
    let list_days = "";
    let list_dates = "";

    if (inputValue.list_days.length > 0)
      list_days = inputValue.list_days.join(",");

    if (inputValue.list_dates.length > 0)
      list_dates = inputValue.list_dates.join(",");

    return {
      ...inputValue,
      list_days,
      list_dates,
    };
  };

  const deleteHabit = (id: any) => {
    dispatch(openModal({ type: "delete", id }));
  };

  const handleError = (error: any) => {
    $("#responseMessage").html(`${error.message}`);
    $("#responseMessage").show(300);
    setTimeout(() => {
      $("#responseMessage").hide(300);
    }, 3000);
  };

  const handleApiResponse = async (response: any) => {
    if (response && response.status === 200) {
      dispatch(closeSidebar());
      setInputValue(defaultInputValue);
      const response = await getHabitByDate(date, config);

      if (response.status === 200) {
        dispatch(
          setHabits(response.data.data.sort((a: any, b: any) => b.id - a.id))
        );
      } else {
        throw new Error(response.statusText);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      let response;
      const data = handleDetailParameter();
      if (e.nativeEvent.submitter.name !== "delete") handleInvalidData();

      switch (e.nativeEvent.submitter.name) {
        case "create":
          if (isGuest && habits.length >= 3)
            throw new Error("Habit Guest maksimal 3");

          response = await createHabit(data, config);
          break;
        case "edit":
          response = await editHabit(
            data,
            config,
            filteredHabits[sidebar.index].id
          );
          break;
        case "delete":
          deleteHabit(filteredHabits[sidebar.index].id);
          break;
        default:
          throw new Error("Terjadi kesalahan");
      }

      await handleApiResponse(response);
    } catch (error: any) {
      handleError(error);
    }
  };

  const displayNone = {
    display: "none",
  };

  const isCreate = sidebar.type === "create";
  const isHabit =
    filteredHabits[sidebar.index] &&
    filteredHabits[sidebar.index].target_perday > 1;

  return (
    <form className="pt-8" onSubmit={handleSubmit}>
      <div className="bg-white w-full rounded-lg py-2 px-3">
        <p className="text-primary-100">Nama Habit</p>
        <input
          required
          type="text"
          className="w-full border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda (Maksimum 50 Karakter)"
          value={inputValue.name}
          onChange={(e) =>
            e.target.value.length < 50 &&
            setInputValue({ ...inputValue, name: e.target.value })
          }
        />
      </div>
      <div className="bg-white w-full rounded-lg py-2 px-3 my-2">
        <p className="text-primary-100">Deskripsi (Opsional)</p>
        <textarea
          className="resize-y w-full border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda (Maksimum 100 Karakter)"
          value={inputValue.description}
          onChange={(e) => {
            if (e.target.value.length < 100)
              setInputValue({ ...inputValue, description: e.target.value });
          }}
        />
      </div>

      <div
        className={`grid ${
          isCreate || isHabit ? "grid-cols-2" : "grid-cols-1"
        } gap-2 w-full`}
      >
        {(isCreate || isHabit) && (
          <div className="group relative text-black">
            <button
              type="button"
              className="group flex justify-between w-full bg-white rounded-lg py-2 px-3"
            >
              <p className="text-primary-100">Target</p>
              <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
                {inputValue.target_perday || "Kosong"}
              </div>
            </button>
            <div className="absolute right-0 invisible w-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-20">
              <div className="bg-white rounded-lg w-full px-4 py-4">
                <p className="text-primary-100 text-center font-semibold text-xs mb-2">
                  Target
                </p>
                <div className="mx-auto px-4 flex justify-between items-center">
                  <button
                    type="button"
                    className="ring-1 ring-primary-100 rounded-lg px-2 mx-1 text-black"
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
                  <input
                    type="text"
                    className="bg-transparent text-center w-8 h-4 border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                    placeholder="00"
                    value={inputValue.target_perday}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setInputValue({ ...inputValue, target_perday: 1 });
                        return;
                      }
                      if (e.target.value.length <= 2) {
                        setInputValue({
                          ...inputValue,
                          target_perday: parseInt(e.target.value),
                        });
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="bg-primary-100 rounded-lg px-2 mx-1 text-white"
                    onClick={() => {
                      if (inputValue.target_perday < 99)
                        setInputValue({
                          ...inputValue,
                          target_perday: inputValue.target_perday + 1,
                        });
                    }}
                  >
                    +
                  </button>
                </div>
                <p className="text-2xs text-black text-center mt-2">
                  Target harian yang dilakukan dalam satu hari
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="group relative text-black">
          <button
            type="button"
            className="group flex justify-between w-full bg-white rounded-lg py-2 px-3"
          >
            <p className="text-primary-100">Prioritas</p>
            <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
              {inputValue.priority ||
                (typeof inputValue.priority === "number" ? 0 : "Kosong")}
            </div>
          </button>
          <div className="absolute right-0 invisible w-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-20">
            <div className="bg-white rounded-lg w-full px-4 py-4">
              <p className="text-primary-100 text-center font-semibold text-xs mb-2">
                Prioritas
              </p>
              <div className="mx-auto px-4 flex justify-between items-center">
                <button
                  type="button"
                  className="ring-1 ring-primary-100 rounded-lg px-2 mx-1 text-black"
                  onClick={() => {
                    if (inputValue.priority > 0) {
                      setInputValue({
                        ...inputValue,
                        priority: inputValue.priority - 1,
                      });
                    }
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  className="bg-transparent text-center w-8 h-4 border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                  placeholder="00"
                  value={inputValue.priority}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setInputValue({ ...inputValue, priority: 0 });
                      return;
                    }
                    if (e.target.value.length <= 2) {
                      setInputValue({
                        ...inputValue,
                        priority: parseInt(e.target.value),
                      });
                    }
                  }}
                />
                <button
                  type="button"
                  className="bg-primary-100 rounded-lg px-2 mx-1 text-white"
                  onClick={() => {
                    if (inputValue.priority < 99) {
                      setInputValue({
                        ...inputValue,
                        priority: inputValue.priority + 1,
                      });
                    }
                  }}
                >
                  +
                </button>
              </div>
              <p className="text-2xs text-black text-center mt-2">
                Habit dengan prioritas lebih tinggi akan ditampilkan lebih
                tinggi dalam daftar
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="cursor-pointer text-primary-100 group flex justify-between w-full bg-white rounded-lg py-2 px-3 my-2"
        onClick={() => setIsOpen({ ...isOpen, timePicker: !isOpen.timePicker })}
      >
        <p className="">Pengingat</p>
        <div className="flex gap-2">
          <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
            {inputValue.start_time != null ? inputValue.start_time : "+"}
          </div>
        </div>
      </div>
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          isOpen.timePicker ? "h-96 my-2" : "h-0 invisible"
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

      <div
        className="group flex justify-between w-full bg-white rounded-lg py-2 px-3 items-center cursor-pointer"
        onClick={() =>
          setIsOpen({ ...isOpen, categoryPicker: !isOpen.categoryPicker })
        }
      >
        <p className="text-primary-100">Kategori</p>
        <div className="bg-ds-gray rounded lg flex justify-between px-2 items-center gap-2 h-6 group-hover:bg-gray-300">
          <p className="text-xs">{category[inputValue.color][1]}</p>
          <div
            className={`${
              category[inputValue.color][0]
            } h-[70%] px-1 flex flex-col justify-center py-1 my-1 rounded`}
          >
            <Image
              src={category[inputValue.color][2]}
              alt="Icon category"
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          isOpen.categoryPicker ? "h-72 my-2 py-6 px-6" : "h-0 invisible"
        } overflow-hidden bg-white grid grid-cols-2 rounded-lg gap-2`}
      >
        {category.map((cat, i) => (
          <CategoryButton
            key={i}
            colorIndex={i}
            category={cat}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        ))}
      </div>

      <div className="text-primary-100 group flex justify-between items-center w-full bg-white rounded-lg py-2 px-3 my-2">
        <p>Frekuensi</p>
        <select
          id="underline_select"
          className="block px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          onChange={(e) => {
            setInputValue({
              ...inputValue,
              type: e.target.value as "daily" | "weekly" | "monthly",
            });
          }}
          value={inputValue.type}
        >
          <option selected value="daily">
            Setiap Hari
          </option>
          <option value="weekly">Per Minggu</option>
          <option value="monthly">Per Bulan</option>
          <option value="interval_day">Interval</option>
        </select>
      </div>
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          inputValue.type != "daily"
            ? "max-h-screen my-2"
            : "max-h-0 invisible h-12"
        }
          ${
            (inputValue.type === "interval_day" ||
              inputValue.type === "weekly") &&
            "h-12"
          } 
          ${inputValue.type === "monthly" && "h-52"}
          overflow-hidden`}
      >
        <div className="w-full bg-white rounded-lg py-2 px-3 overflow-x-auto">
          {inputValue.type === "weekly" && (
            <div className="w-full h-full flex justify-between">
              {days.map((day, i) => (
                <DayButton
                  key={i}
                  dayIndex={i}
                  day={day}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              ))}
            </div>
          )}
          {inputValue.type === "monthly" && (
            <div className="w-full h-full grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <DateButton
                  key={day}
                  day={day}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                />
              ))}
            </div>
          )}
          {inputValue.type === "interval_day" && (
            <div className="flex justify-center items-center gap-2">
              <p>Setiap</p>
              <input
                type="text"
                className="text-center w-8 h-6 border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                placeholder="00"
                value={inputValue.interval_day}
                onChange={(e) =>
                  e.target.value.length <= 2 &&
                  (e.target.value === "" || !isNaN(parseInt(e.target.value))) &&
                  setInputValue({
                    ...inputValue,
                    interval_day: parseInt(e.target.value),
                  })
                }
              />
              <p>Hari</p>
            </div>
          )}
        </div>
      </div>

      <div
        id="responseMessage"
        style={displayNone}
        className="border-red-500 text-red-400 bg-red-200 mb-2 text-center p-3 border rounded-lg font-bold"
      />

      {sidebar.type === "create" && (
        <div className="w-full flex justify-center mt-8 mb-4">
          <button
            type="submit"
            name="create"
            className="py-2 bg-primary-100 rounded-lg w-full text-xl font-bold text-white hover:bg-primary-hover"
          >
            Buat
          </button>
        </div>
      )}
      {sidebar.type === "edit" && (
        <div className="flex gap-1 w-full mt-8 mb-4">
          <button
            type="submit"
            name="edit"
            className="w-full py-2 bg-primary-100 rounded-lg text-xl font-bold text-white hover:bg-primary-hover"
          >
            Edit
          </button>
          <button
            type="submit"
            name="delete"
            className="w-full py-2 bg-danger-100 rounded-lg text-xl font-bold text-white hover:bg-danger-hover"
          >
            Hapus
          </button>
        </div>
      )}
    </form>
  );
};

export default HabitForm;
