import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/redux/store";
import { closeSidebar } from "@/redux/features/habitSidebar/habitSidebarSlice";
import { setHabits } from "@/redux/features/habits/habitsSlice";
import { openModal } from "@/redux/features/modal/modalSlice";
import { createHabit, editHabit, getHabitByDate } from "../api";
import {
  InputValueType,
  defaultInputValue,
  getInitialState,
  handleApiResponse,
  handleDetailParameter,
  handleError,
  handleInvalidData,
  resetState,
} from "./HabitFormUtils";
import { NameDesc } from "./Sections/NameDesc";
import { TargetPrio } from "./Sections/TargetPrio";
import { Reminder } from "./Sections/Reminder";
import { Category } from "./Sections/Category";
import { Frequency } from "./Sections/Frequency";
import { SubmitButtons } from "./Sections/SubmitButton";

const HabitForm = ({ user }: { user: any }) => {
  const dispatch = useAppDispatch();
  const sidebar = useSelector((state: any) => state.sidebar);
  const { habits, filteredHabits } = useSelector((state: any) => state.habits);
  const { date } = useSelector((state: any) => state.time);

  const isGuest = user.name === "Guest";
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

  // Input Value
  const [inputValue, setInputValue] = useState<InputValueType>(
    getInitialState(filteredHabits, sidebar.index)
  );

  useEffect(() => {
    resetState(filteredHabits, sidebar.index, setInputValue, setIsOpen, isOpen);

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

  // Submit Form
  const access_token = `Bearer ${user.token}`;
  const config = {
    headers: {
      Authorization: access_token,
    },
  };

  const deleteHabit = (id: any) => {
    dispatch(openModal({ type: "delete", id }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      let response;
      const data = handleDetailParameter(inputValue);
      if (e.nativeEvent.submitter.name !== "delete")
        handleInvalidData(data, habits, sidebar, data.name);

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

      await handleApiResponse(
        response,
        dispatch,
        setInputValue,
        getHabitByDate,
        date,
        config,
        defaultInputValue,
        setHabits
      );
    } catch (error: any) {
      handleError(error);
    }
  };

  const displayNone = {
    display: "none",
  };

  return (
    <form className="h-full" onSubmit={handleSubmit}>
      <div className="h-[80%] overflow-scroll">
        <h1 className="font-semibold text-xl pb-4">Definisikan Habitmu!</h1>
        <NameDesc inputValue={inputValue} setInputValue={setInputValue} />

        <TargetPrio
          inputValue={inputValue}
          setInputValue={setInputValue}
          filteredHabits={filteredHabits}
          sidebar={sidebar}
        />

        <Reminder
          inputValue={inputValue}
          setInputValue={setInputValue}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <Category
          inputValue={inputValue}
          setInputValue={setInputValue}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          category={category}
        />

        <Frequency
          inputValue={inputValue}
          setInputValue={setInputValue}
          days={days}
        />
      </div>

      <div className="flex w-full justify-center z-1000 w-full fixed top-0 left-0">
        <div
          id="responseMessage"
          style={{ ...displayNone }}
          className="border-red-500 text-red-400 bg-red-200 mx-auto text-center p-3 border rounded-lg font-bold fixed top-0 mt-8 z-50 w-full max-w-xs"
        />
      </div>

      <SubmitButtons sidebar={sidebar} />
    </form>
  );
};

export default HabitForm;
