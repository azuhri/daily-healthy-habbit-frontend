import React from "react";
import { InputValueType } from "../HabitFormUtils";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";

interface InputProps {
  inputValue: InputValueType;
  setInputValue: (value: InputValueType) => void;
  filteredHabits: any;
  sidebar: any;
}

export const TargetPrio: React.FC<InputProps> = ({
  inputValue,
  setInputValue,
  filteredHabits,
  sidebar,
}) => {
  const isCreate = sidebar.type === "create";
  const isHabit =
    filteredHabits[sidebar.index] &&
    filteredHabits[sidebar.index].target_perday > 1;

  return (
    <>
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
    </>
  );
};
