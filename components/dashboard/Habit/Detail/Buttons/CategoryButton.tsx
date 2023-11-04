import Image from "next/image";

interface CategoryButtonProps {
  colorIndex: number;
  category: string[];
  inputValue: any;
  setInputValue: Function;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  colorIndex,
  category,
  inputValue,
  setInputValue,
}) => {
  return (
    <button
      type="button"
      className={`rounded-lg text-black h-full w-full ${
        inputValue.color == colorIndex && "ring-4"
      } bg-gray-100 hover:bg-gray-300`}
      onClick={() =>
        setInputValue({
          ...inputValue,
          color: colorIndex,
        })
      }
    >
      <div className="flex justify-between px-2 items-center">
        <p className="text-xs lg:text-sm">{category[1]}</p>
        <div
          className={`${category[0]} h-[70%] px-1 flex flex-col justify-center py-1 my-1 rounded`}
        >
          <Image src={category[2]} alt="Icon category" width={24} height={24} />
        </div>
      </div>
    </button>
  );
};

export default CategoryButton;
