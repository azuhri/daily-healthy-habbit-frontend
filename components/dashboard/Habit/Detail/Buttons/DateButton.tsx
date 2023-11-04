interface DateButtonProps {
  day: number;
  inputValue: any;
  setInputValue: Function;
}

const DateButton: React.FC<DateButtonProps> = ({
  day,
  inputValue,
  setInputValue,
}) => {
  return (
    <button
      type="button"
      key={day}
      className={`rounded-lg h-full px-2 py-1 ${
        inputValue.list_dates.includes(day)
          ? "text-white bg-primary-100"
          : "text-black bg-ds-gray"
      }`}
      onClick={() =>
        setInputValue({
          ...inputValue,
          list_dates: inputValue.list_dates.includes(day)
            ? inputValue.list_dates.filter((item: number) => item !== day)
            : [...inputValue.list_dates, day],
        })
      }
    >
      <p>{day}</p>
    </button>
  );
};

export default DateButton;
