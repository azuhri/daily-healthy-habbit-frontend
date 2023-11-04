interface DayButtonProps {
  dayIndex: number;
  day: string[];
  inputValue: any;
  setInputValue: Function;
}

const DayButton: React.FC<DayButtonProps> = ({
  dayIndex,
  day,
  inputValue,
  setInputValue,
}) => {
  return (
    <button
      type="button"
      key={dayIndex}
      className={`text-xs md:text-sm rounded-lg h-full px-2 py-1 ${
        inputValue.list_days.includes(day[0])
          ? "text-white bg-primary-100"
          : "text-black bg-ds-gray"
      }`}
      onClick={() => {
        if (inputValue.list_days.includes(day[0])) {
          setInputValue({
            ...inputValue,
            list_days: inputValue.list_days.filter(
              (item: string) => item !== day[0]
            ),
          });
        } else {
          setInputValue({
            ...inputValue,
            list_days: [...inputValue.list_days, day[0]],
          });
        }
      }}
    >
      <p>{day[1].substring(0, 3)}</p>
    </button>
  );
};

export default DayButton;
