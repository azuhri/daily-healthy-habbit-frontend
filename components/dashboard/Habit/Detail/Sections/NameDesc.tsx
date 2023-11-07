import React from "react";
import { InputValueType } from "../HabitFormUtils";

interface InputProps {
  inputValue: InputValueType;
  setInputValue: (value: InputValueType) => void;
}

export const NameDesc: React.FC<InputProps> = ({
  inputValue,
  setInputValue,
}) => {
  return (
    <>
      <div className="bg-white w-full rounded-lg py-2 px-3">
        <p className="text-primary-100">Nama Habit</p>
        <input
          required
          type="text"
          placeholder="Jawaban Anda (Maksimum 50 Karakter)"
          className="w-full border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
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
    </>
  );
};
