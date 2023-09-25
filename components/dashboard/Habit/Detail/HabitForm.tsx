import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HabitForm = ({ children }: { children: React.ReactNode }) => {
  const data = useSelector((state: any) => state.sidebar.data);
  const [bgMobileColor, setBgMobileColor] = useState("bg-mobile-type-0");

  useEffect(() => {
    if (data) {
      setBgMobileColor(`bg-mobile-type-${data.color}`);
    }
  }, [data]);

  return (
    <form className="pt-8">
      <div className="bg-white w-full rounded-lg py-2 px-3">
        <p className="text-primary-100">Nama Habit</p>
        <input
          type="text"
          className="w-full border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda"
          value={data ? data.name : ""}
        />
      </div>
      <div className="bg-white w-full rounded-lg py-2 px-3 my-2">
        <p className="text-primary-100">Deskripsi (Opsional)</p>
        <input
          type="text"
          className="w-full border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda"
          value={data ? data.description : ""}
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
            {data ? data.interval_day : 0}
          </div>
        </button>
        <button className="group flex justify-between w-full bg-white rounded-lg py-2 px-3">
          <p className="text-primary-100">Prioritas</p>
          <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
            {data ? data.priority : 0}
          </div>
        </button>
      </div>
      <button className="group flex justify-between w-full bg-white rounded-lg py-2 px-3 my-2">
        <p className="text-primary-100">Warna</p>
        <div
          className={
            `h-full rounded-lg px-2 text-white group-hover:bg-primary-hover ` +
            bgMobileColor
          }
        >
          {data ? data.color : 0}
        </div>
      </button>
      {children}
    </form>
  );
};

export default HabitForm;
