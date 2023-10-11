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

const HabitForm = ({ user }: { user: any }) => {
  const dispatch = useAppDispatch();
  const sidebar = useSelector((state: any) => state.sidebar);
  const { habits, filteredHabits } = useSelector((state: any) => state.habits);
  const { date } = useSelector((state: any) => state.time);

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

  const defaultInputValue = {
    id: null,
    name: "",
    description: "",
    start_time: null,
    type: "daily",
    target_perday: 1,
    priority: 0,
    color: 0,
    start_date: date,
    list_days: [],
    list_dates: [],
    interval_day: 1,
  };

  const [inputValue, setInputValue] = useState(
    filteredHabits[sidebar.index]
      ? {
          id: filteredHabits[sidebar.index].id,
          name: filteredHabits[sidebar.index].name,
          description: filteredHabits[sidebar.index].description
            ? filteredHabits[sidebar.index].description
            : "",
          start_time: filteredHabits[sidebar.index].start_time,
          type: filteredHabits[sidebar.index].type,
          target_perday: filteredHabits[sidebar.index].target_perday
            ? filteredHabits[sidebar.index].target_perday
            : 1,
          priority: filteredHabits[sidebar.index].priority
            ? filteredHabits[sidebar.index].priority
            : 0,
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
          interval_day: filteredHabits[sidebar.index].interval_day
            ? filteredHabits[sidebar.index].interval_day
            : 1,
        }
      : defaultInputValue
  );

  useEffect(() => {
    filteredHabits[sidebar.index]
      ? setInputValue({
          id: filteredHabits[sidebar.index].id,
          name: filteredHabits[sidebar.index].name,
          description: filteredHabits[sidebar.index].description
            ? filteredHabits[sidebar.index].description
            : "",
          start_time: filteredHabits[sidebar.index].start_time,
          type: filteredHabits[sidebar.index].type,
          target_perday: filteredHabits[sidebar.index].target_perday
            ? filteredHabits[sidebar.index].target_perday
            : 1,
          priority: filteredHabits[sidebar.index].priority
            ? filteredHabits[sidebar.index].priority
            : 0,
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
          interval_day: filteredHabits[sidebar.index].interval_day,
        })
      : setInputValue(defaultInputValue);
    setIsOpen({ ...isOpen, timePicker: false, categoryPicker: false });

    if (!filteredHabits[sidebar.index] && sidebar.type === "edit") {
      dispatch(closeSidebar());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredHabits[sidebar.index], sidebar.isOpen]);

  useEffect(() => {
    switch (inputValue.type) {
      case "daily":
        setInputValue({
          ...inputValue,
          list_days: [],
          list_dates: [],
          interval_day: 1,
        });
        break;
      case "weekly":
        setInputValue({
          ...inputValue,
          list_dates: [],
          interval_day: 1,
        });
        break;
      case "monthly":
        setInputValue({
          ...inputValue,
          list_days: [],
          interval_day: 1,
        });
        break;
      case "interval_day":
        setInputValue({
          ...inputValue,
          list_days: [],
          list_dates: [],
        });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue.type]);

  const handleInvalidData = () => {
    if (!inputValue.start_time) throw new Error("Pengingat belum diisi");
    if (
      habits.some((habit: any) => habit.name === inputValue.name) &&
      habits[sidebar.index].name !== inputValue.name
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
      throw new Error("Target perhari harus lebih dari 0");
    if (isNaN(inputValue.priority.toString()) || inputValue.priority === "")
      throw new Error("Prioritas harus berupa angka");
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const API =
        process.env.API || "https://staging-api-health2023.agileteknik.com";
      const access_token = `Bearer ${user.token}`;
      const config = {
        headers: {
          Authorization: access_token,
        },
      };

      let response;
      const data = handleDetailParameter();
      if (e.nativeEvent.submitter.name !== "delete") handleInvalidData();

      switch (e.nativeEvent.submitter.name) {
        case "create":
          response = await axios.post(`${API}/api/v2/habbit`, data, config);
          break;
        case "edit":
          const dataEdit = {
            ...data,
            // TEMPORARY FIX NANTI DIHAPUS
            alarm_code: 1,
          };
          response = await axios.put(
            `${API}/api/v2/habbit/${filteredHabits[sidebar.index].id}`,
            dataEdit,
            config
          );
          break;
        case "delete":
          dispatch(
            openModal({ type: "delete", id: filteredHabits[sidebar.index].id })
          );
          break;
        default:
          throw new Error("Terjadi kesalahan");
      }

      if (response && response.status === 200) {
        dispatch(closeSidebar());
        setInputValue(defaultInputValue);
        const response4 = await axios.get(
          `${API}/api/v2/user?date=${date}`,
          config
        );

        if (response4.status === 200) {
          dispatch(
            setHabits(response4.data.data.sort((a: any, b: any) => b.id - a.id))
          );
        } else {
          throw new Error(response4.statusText);
        }
      }
    } catch (error: any) {
      $("#responseMessage").html(`${error.message}`);
      $("#responseMessage").show(300);
      setTimeout(() => {
        $("#responseMessage").hide(300);
      }, 3000);
    }
  };

  const categorySelector = [];
  for (let i = 0; i < 8; i++) {
    categorySelector.push(
      <div className="my-1">
        <button
          type="button"
          key={i}
          className={`rounded-lg text-black h-full px-2 w-full ${
            inputValue.color == i && "ring-4"
          } bg-gray-100 hover:bg-gray-300`}
          onClick={() =>
            setInputValue({
              ...inputValue,
              color: i,
            })
          }
        >
          <div className="flex justify-between px-4 items-center">
            <p>{category[i][1]}</p>
            <div
              className={`${category[i][0]} h-[70%] px-1 flex flex-col justify-center py-1 my-1 rounded`}
            >
              <Image
                src={category[i][2]}
                alt="Icon category"
                width={24}
                height={24}
              />
            </div>
          </div>
        </button>
      </div>
    );
  }

  const weekSelector = [];
  for (let i = 0; i < 7; i++) {
    let day = [
      ["Sunday", "Minggu"],
      ["Monday", "Senin"],
      ["Tuesday", "Selasa"],
      ["Wednesday", "Rabu"],
      ["Thursday", "Kamis"],
      ["Friday", "Jumat"],
      ["Saturday", "Sabtu"],
    ];
    weekSelector.push(
      <button
        type="button"
        key={i}
        className={`rounded-lg h-full px-2 py-1 ${
          inputValue.list_days.includes(day[i][0])
            ? "text-white bg-primary-100"
            : "text-black bg-ds-gray"
        }`}
        onClick={() =>
          setInputValue({
            ...inputValue,
            list_days: inputValue.list_days.includes(day[i][0])
              ? inputValue.list_days.filter(
                  (item: string) => item !== day[i][0]
                )
              : [...inputValue.list_days, day[i][0]],
          })
        }
      >
        <p>{day[i][1].substring(0, 3)}</p>
      </button>
    );
  }

  const monthSelector = [];
  for (let i = 1; i <= 31; i++) {
    monthSelector.push(
      <button
        type="button"
        key={i}
        className={`rounded-lg h-full px-2 py-1 ${
          inputValue.list_dates.includes(i)
            ? "text-white bg-primary-100"
            : "text-black bg-ds-gray"
        }`}
        onClick={() =>
          setInputValue({
            ...inputValue,
            list_dates: inputValue.list_dates.includes(i)
              ? inputValue.list_dates.filter((item: number) => item !== i)
              : [...inputValue.list_dates, i],
          })
        }
      >
        <p>{i}</p>
      </button>
    );
  }

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
                    className="ring-1 ring-primary-100 rounded-lg px-2 text-black"
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
                    className="text-center w-8 h-4 border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                    placeholder="00"
                    value={inputValue.target_perday}
                    onChange={(e) =>
                      e.target.value.length <= 2 &&
                      (e.target.value === "" ||
                        !isNaN(parseInt(e.target.value))) &&
                      setInputValue({
                        ...inputValue,
                        target_perday: e.target.value,
                      })
                    }
                  />
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
                  className="ring-1 ring-primary-100 rounded-lg px-2 text-black"
                  onClick={() => {
                    if (inputValue.priority > 0)
                      setInputValue({
                        ...inputValue,
                        priority: inputValue.priority - 1,
                      });
                  }}
                >
                  -
                </button>
                <input
                  type="text"
                  className="text-center w-8 h-4 border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
                  placeholder="00"
                  value={inputValue.priority}
                  onChange={(e) =>
                    e.target.value.length <= 2 &&
                    (e.target.value === "" ||
                      !isNaN(parseInt(e.target.value))) &&
                    setInputValue({
                      ...inputValue,
                      priority: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="bg-primary-100 rounded-lg px-2 text-white"
                  onClick={() => {
                    if (inputValue.priority == "")
                      setInputValue({
                        ...inputValue,
                        priority: 1,
                      });
                    else
                      setInputValue({
                        ...inputValue,
                        priority: inputValue.priority + 1,
                      });
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
          isOpen.categoryPicker ? "h-72 my-2 py-6 px-12" : "h-0 invisible"
        } overflow-hidden bg-white grid grid-cols-2 rounded-lg gap-2`}
      >
        {categorySelector}
      </div>

      <div className="text-primary-100 group flex justify-between items-center w-full bg-white rounded-lg py-2 px-3 my-2">
        <p>Frekuensi</p>
        <select
          id="underline_select"
          className="block px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          onChange={(e) => {
            setInputValue({ ...inputValue, type: e.target.value });
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
        <div className="w-full bg-white rounded-lg py-2 px-3">
          {inputValue.type === "weekly" && (
            <div className="w-full h-full flex justify-between">
              {weekSelector}
            </div>
          )}
          {inputValue.type === "monthly" && (
            <div className="w-full h-full grid grid-cols-7 gap-2">
              {monthSelector}
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
                  setInputValue({ ...inputValue, interval_day: e.target.value })
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
