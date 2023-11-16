// Reminder.tsx
import React from "react";
import { StaticTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { InputValueType } from "../HabitFormUtils";

interface Reminder {
  inputValue: InputValueType;
  setInputValue: Function;
  isOpen: { timePicker: boolean };
  setIsOpen: Function;
}

export const Reminder: React.FC<Reminder> = ({
  inputValue,
  setInputValue,
  isOpen,
  setIsOpen,
}) => {
  const unmodifiedTime = inputValue.start_time;

  return (
    <>
      <div
        className="cursor-pointer text-primary-100 group flex justify-between w-full bg-white rounded-lg py-2 px-3 my-2"
        onClick={() => setIsOpen({ ...isOpen, timePicker: !isOpen.timePicker })}
      >
        <p className="">Pengingat</p>
        <div className="flex gap-2">
          <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
            {inputValue.start_time}
          </div>
        </div>
      </div>
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          isOpen.timePicker ? "h-[27rem] my-2" : "h-0 invisible"
        } overflow-hidden`}
      >
        <StaticTimePicker
          className="rounded-lg"
          value={moment(inputValue.start_time, "HH:mm")}
          onChange={(newValue) => {
            setInputValue({
              ...inputValue,
              start_time: moment(newValue).format("HH:mm"),
            });
          }}
          onAccept={() => {
            setIsOpen({ ...isOpen, timePicker: false });
          }}
          onError={() => {
            setInputValue({
              ...inputValue,
              start_time: moment(unmodifiedTime, "HH:mm").format("HH:mm"),
            });
          }}
        />
      </div>
    </>
  );
};
