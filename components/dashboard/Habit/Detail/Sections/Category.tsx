// Category.tsx
import React from "react";
import Image from "next/image";
import CategoryButton from "../Buttons/CategoryButton";
import { InputValueType } from "../HabitFormUtils";

interface CategoryProps {
  inputValue: InputValueType;
  setInputValue: Function;
  isOpen: { categoryPicker: boolean };
  setIsOpen: Function;
  category: string[][];
}

export const Category: React.FC<CategoryProps> = ({
  inputValue,
  setInputValue,
  isOpen,
  setIsOpen,
  category,
}) => {
  return (
    <>
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
    </>
  );
};
