const HabitForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <form className="pt-8">
      <div className="bg-white w-full rounded-lg py-2 px-3">
        <p className="text-primary-100">Nama Habit</p>
        <input
          type="text"
          className="w-full border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda"
        />
      </div>
      <div className="bg-white w-full rounded-lg py-2 px-3 my-2">
        <p className="text-primary-100">Deskripsi (Opsional)</p>
        <input
          type="text"
          className="w-full border-b-2 border-gray-300 px-1 my-1 focus:outline-none focus:border-primary-100 placeholder-gray-300"
          placeholder="Jawaban Anda"
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
            0
          </div>
        </button>
        <button className="group flex justify-between w-full bg-white rounded-lg py-2 px-3">
          <p className="text-primary-100">Prioritas</p>
          <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
            0
          </div>
        </button>
      </div>
      <button className="group flex justify-between w-full bg-white rounded-lg py-2 px-3 my-2">
        <p className="text-primary-100">Warna</p>
        <div className="h-full bg-primary-100 rounded-lg px-2 text-white group-hover:bg-primary-hover">
          0
        </div>
      </button>
      {children}
    </form>
  );
};

export default HabitForm;
