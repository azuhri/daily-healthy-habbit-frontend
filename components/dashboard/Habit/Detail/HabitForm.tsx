import { StaticTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const HabitForm = ({ children }: { children: React.ReactNode }) => {
  const data = useSelector((state: any) => state.sidebar.data);
  const [bgColor, setBgColor] = useState("bg-[#E17055]");
  const [isTimepickerOpen, setIsTimepickerOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    data
      ? {
          name: data.name,
          description: data.description,
          target_perday: data.target_perday,
          priority: data.priority,
          color: data.color,
          start_time: data.start_time,
        }
      : {
          name: "",
          description: "",
          target_perday: 1,
          priority: 1,
          color: 0,
          start_time: "00:00",
        }
  );

  useEffect(() => {
    switch (inputValue.color) {
      case 0:
        setBgColor("bg-[#E17055]");
        break;
      case 1:
        setBgColor("bg-[#8373a0]");
        break;
      case 2:
        setBgColor("bg-[#46aab9]");
        break;
      case 3:
        setBgColor("bg-[#60a588]");
        break;
      case 4:
        setBgColor("bg-[#d58734]");
        break;
      case 5:
        setBgColor("bg-[#a5647c]");
        break;
      case 6:
        setBgColor("bg-[#4d9b9d]");
        break;
      case 7:
        setBgColor("bg-[#5686aa]");
        break;
      default:
        setBgColor("bg-[#E17055]");
        break;
    }
  }, [inputValue.color]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(name, description, target_perday, priority, color);
  };

  const colorSelector = [];
  for (let i = 0; i < 8; i++) {
    let color = [
      "bg-[#E17055]",
      "bg-[#8373a0]",
      "bg-[#46aab9]",
      "bg-[#60a588]",
      "bg-[#d58734]",
      "bg-[#a5647c]",
      "bg-[#4d9b9d]",
      "bg-[#5686aa]",
    ];
    colorSelector.push(
      <button
        key={i}
        className={`rounded-lg text-black h-full ` + color[i]}
        onClick={() =>
          setInputValue({
            ...inputValue,
            color: i,
          })
        }
      >
        <p className="invisible">0</p>
      </button>
    );
  }

  return (
    <form className="pt-8" onSubmit={handleSubmit}>
      <div className="bg-white w-full rounded-lg py-2 px-3">
        <p className="text-primary-100">Nama Habit</p>
        <input
          type="text"
          className="w-full border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda"
          value={inputValue.name}
          onChange={(e) =>
            setInputValue({ ...inputValue, name: e.target.value })
          }
        />
      </div>
      <div className="bg-white w-full rounded-lg py-2 px-3 my-2">
        <p className="text-primary-100">Deskripsi (Opsional)</p>
        <input
          type="text"
          className="w-full border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda"
          value={inputValue.description}
          onChange={(e) => {
            setInputValue({ ...inputValue, description: e.target.value });
          }}
        />
      </div>
      <button
        className="text-primary-100 group flex justify-between w-full bg-white rounded-lg py-2 px-3 my-2"
        onClick={() => setIsTimepickerOpen(!isTimepickerOpen)}
      >
        <p className="">Pengingat</p>
        <div className="flex gap-2">
          {inputValue.start_time}
          <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
            +
          </div>
        </div>
      </button>
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          isTimepickerOpen ? "h-96 my-2" : "h-0 invisible"
        } overflow-hidden`}
      >
        <StaticTimePicker
          value={moment(inputValue.start_time, "HH:mm")}
          onChange={(newValue) => {
            setInputValue({
              ...inputValue,
              start_time: moment(newValue).format("HH:mm"),
            });
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="group relative text-black">
          <button className="group flex justify-between w-full bg-white rounded-lg py-2 px-3">
            <p className="text-primary-100">Perulangan</p>
            <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
              {inputValue.target_perday}
            </div>
          </button>
          <div className="absolute right-0 invisible w-56 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-20">
            <div className="bg-white rounded-lg w-full h-24 mx-auto flex justify-between items-center px-4">
              <button
                className="bg-primary-100 rounded-lg px-2 text-white"
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
              <div className="bg-primary-100 rounded-lg px-2 text-white">
                {inputValue.target_perday}
              </div>
              <button
                className="bg-primary-100 rounded-lg px-2 text-white"
                onClick={() => {
                  setInputValue({
                    ...inputValue,
                    target_perday: inputValue.target_perday + 1,
                  });
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="group relative text-black">
          <button className="group flex justify-between w-full bg-white rounded-lg py-2 px-3">
            <p className="text-primary-100">Prioritas</p>
            <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
              {inputValue.priority}
            </div>
          </button>
          <div className="absolute right-0 invisible w-56 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-20">
            <div className="bg-white rounded-lg w-full h-24 mx-auto flex justify-between items-center px-4">
              <button
                className="bg-primary-100 rounded-lg px-2 text-white"
                onClick={() => {
                  setInputValue({
                    ...inputValue,
                    priority: inputValue.priority - 1,
                  });
                }}
              >
                -
              </button>
              <div className="bg-primary-100 rounded-lg px-2 text-white">
                {inputValue.priority}
              </div>
              <button
                className="bg-primary-100 rounded-lg px-2 text-white"
                onClick={() =>
                  setInputValue({
                    ...inputValue,
                    priority: inputValue.priority + 1,
                  })
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="group relative text-black">
        <button className="group flex justify-between w-full bg-white rounded-lg py-2 px-3 my-2">
          <p className="text-primary-100">Warna</p>
          <div className={`h-full rounded-lg px-2 text-white ${bgColor}`}>
            <p className="invisible">0</p>
          </div>
        </button>
        <div className="absolute inset-0 invisible w-full flex justify-center top-10">
          <div className="w-56 transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-20">
            <div className="bg-white rounded-lg w-full h-24 mx-auto grid grid-cols-4 items-center px-4 py-4 gap-2">
              {colorSelector}
            </div>
          </div>
        </div>
      </div>
      {children}
    </form>
  );
};

export default HabitForm;
