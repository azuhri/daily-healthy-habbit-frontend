import { closeSidebar } from "@/redux/features/habitSidebar/habitSidebarSlice";
import $ from "jquery";

export const handleInvalidData = (
  inputValue: any,
  habits: any,
  sidebar: any,
  name: any
) => {
  const conditions = {
    Cringe: true,
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
  response: any,
  dispatch: Function,
  setInputValue: Function,
  getHabitByDate: Function,
  date: string,
  config: any,
  defaultInputValue: any,
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
