// Frequency.tsx
import React from "react";
import DayButton from "../Buttons/DayButton";
import DateButton from "../Buttons/DateButton";
import { InputValueType } from "../HabitFormUtils";

interface FrequencyProps {
  inputValue: InputValueType;
  setInputValue: Function;
  days: string[][];
}

export const Frequency: React.FC<FrequencyProps> = ({
  inputValue,
  setInputValue,
  days,
}) => {
  return (
    <>
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
    </>
  );
};
