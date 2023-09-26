import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TimePicker from "react-time-picker";

const HabitForm = ({ children }: { children: React.ReactNode }) => {
  const data = useSelector((state: any) => state.sidebar.data);
  const [color, setColor] = useState("bg-[#E17055]");
  const [name, setName] = useState(data ? data.name : "");
  const [description, setDescription] = useState(data ? data.description : "");

  useEffect(() => {
    if (!data) return;
    switch (data.color) {
      case 0:
        setColor("bg-[#E17055]");
        break;
      case 1:
        setColor("bg-[#8373a0]");
        break;
      case 2:
        setColor("bg-[#46aab9]");
        break;
      case 3:
        setColor("bg-[#60a588]");
        break;
      case 4:
        setColor("bg-[#d58734]");
        break;
      case 5:
        setColor("bg-[#a5647c]");
        break;
      case 6:
        setColor("bg-[#4d9b9d]");
        break;
      case 7:
        setColor("bg-[#5686aa]");
        break;
      default:
        setColor("bg-[#E17055]");
        break;
    }
    setName(data.name);
    setDescription(data.description ? data.description : "");
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(name, description);
  };

  return (
    <form className="pt-8" onSubmit={handleSubmit}>
      <div className="bg-white w-full rounded-lg py-2 px-3">
        <p className="text-primary-100">Nama Habit</p>
        <input
          type="text"
          className="w-full border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="bg-white w-full rounded-lg py-2 px-3 my-2">
        <p className="text-primary-100">Deskripsi (Opsional)</p>
        <input
          type="text"
          className="w-full border-0 border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:ring-0 focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="group flex justify-between w-full bg-white rounded-lg py-2 px-3 my-2">
        <p className="text-primary-100">Pengingat</p>
        <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
          +
        </div>
      </button>

      <div className="grid grid-cols-2 gap-2 my-2">
        <button className="group flex justify-between w-full bg-white rounded-lg py-2 px-3">
          <p className="text-primary-100">Perulangan</p>
          <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
            {data ? (data.target_perday ? data.target_perday : 0) : 0}
          </div>
        </button>
        <button className="group flex justify-between w-full bg-white rounded-lg py-2 px-3">
          <p className="text-primary-100">Prioritas</p>
          <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
            {data ? (data.priority ? data.priority : 0) : 0}
          </div>
        </button>
      </div>
      <button className="group flex justify-between w-full bg-white rounded-lg py-2 px-3 my-2">
        <p className="text-primary-100">Warna</p>
        <div className={`h-full rounded-lg px-2 text-white ${color}`}>
          <p className="invisible">0</p>
        </div>
      </button>
      {children}
    </form>
  );
};

export default HabitForm;
