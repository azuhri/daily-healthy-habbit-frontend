import { closeSidebar } from "@/redux/features/habitSidebar/habitSidebarSlice";
import $ from "jquery";
import moment from "moment";

const date = moment().format("YYYY-MM-DD");

// Input value
export type InputValueType = {
  id: number;
  name: string;
  description: string;
  start_time: string;
  type: "daily" | "weekly" | "monthly" | "interval_day";
  target_perday: number;
  priority: number;
  color: number;
  start_date: string;
  list_days: string[];
  list_dates: number[];
  interval_day: number;
  alarm_code: string;
};

export const defaultInputValue: InputValueType = {
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

export const getInitialState = (
  filteredHabits: any,
  index: number
): InputValueType => {
  if (filteredHabits[index]) {
    return {
      id: filteredHabits[index].id,
      name: filteredHabits[index].name,
      description: filteredHabits[index].description || "",
      start_time: filteredHabits[index].start_time,
      type: filteredHabits[index].type,
      target_perday: filteredHabits[index].target_perday || 1,
      priority: filteredHabits[index].priority || 0,
      color: filteredHabits[index].color,
      start_date: date,
      list_days: filteredHabits[index].detail_parameter
        ? filteredHabits[index].detail_parameter.split(",")
        : [],
      list_dates: filteredHabits[index].detail_parameter
        ? filteredHabits[index].detail_parameter
            .split(",")
            .map((item: any) => parseInt(item))
        : [],
      interval_day: filteredHabits[index].interval_day || 1,
      alarm_code: filteredHabits[index].alarm_code,
    };
  } else {
    return defaultInputValue;
  }
};

export const resetState = (
  filteredHabits: any,
  index: number,
  setInputValue: Function,
  setIsOpen: Function,
  isOpen: { timePicker: boolean; categoryPicker: boolean }
) => {
  setInputValue(getInitialState(filteredHabits, index));
  setIsOpen({ ...isOpen, timePicker: false, categoryPicker: false });
};

// Submit form
export const handleInvalidData = (
  inputValue: InputValueType,
  habits: any,
  sidebar: { type: string; index: number },
  name: string
) => {
  const conditions = {
    "Pengingat belum diisi": !inputValue.start_time,
    "Nama habit sudah ada":
      habits.some((habit: any) => habit.name === name) &&
      (sidebar.type === "create" ||
        (sidebar.type === "edit" && habits[sidebar.index].name !== name)),
    "Frekuensi belum diisi":
      inputValue.type != "daily" &&
      inputValue.list_days.length < 1 &&
      inputValue.list_dates.length < 1 &&
      (inputValue.interval_day < 1 || inputValue.type != "interval_day"),
    "Target perhari tidak boleh kosong": inputValue.target_perday < 1,
    "Prioritas tidak boleh kurang dari 0": inputValue.priority < 0,
  };

  Object.entries(conditions).forEach(([message, condition]) => {
    if (condition) throw new Error(message);
  });
};

export const handleDetailParameter = (inputValue: any) => {
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

export const handleError = (error: any) => {
  $("#responseMessage").html(`${error.message}`);
  $("#responseMessage").show(300);
  setTimeout(() => {
    $("#responseMessage").hide(300);
  }, 3000);
};

export const handleApiResponse = async (
  response: { status: number; statusText: string } | undefined,
  dispatch: Function,
  setInputValue: Function,
  getHabitByDate: Function,
  date: string,
  config: any,
  defaultInputValue: InputValueType,
  setHabits: Function
) => {
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
