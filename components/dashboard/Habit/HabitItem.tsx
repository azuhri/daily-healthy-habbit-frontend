import Image from "next/image";

const HabitItem = () => {
  return (
    <div className="relative flex rounded-full w-full bg-white h-28">
      <div className="w-1/6 h-full bg-blue-500 rounded-l-lg"></div>
      <div className="w-4/6 h-full bg-white rounded-r-lg text-black py-2 px-2">
        <h1 className="font-bold">Nama Habit</h1>
        <div className="flex space-x-2 text-xs">
          <p>• 5:00 AM</p>
          <p>• Saat ini: 8</p>
        </div>
        <p className="pt-3 text-xs line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex doloremque
          ratione modi. In, ipsa ullam expedita veritatis eligendi blanditiis
          error magnam sit? Repellendus odio ab fuga tenetur architecto soluta,
          officiis dolor deleniti qui error aliquid possimus et eligendi porro,
          assumenda, incidunt neque eveniet rerum consequatur hic cumque!
          Exercitationem, quidem debitis expedita aliquam odit libero veniam
          porro optio illo nemo. Aspernatur quae eligendi ducimus molestias quia
          labore vel minima illum blanditiis nam molestiae dolorum corrupti
          aperiam repellat ab neque ex aut, atque voluptatum nostrum
          necessitatibus minus iusto dicta sit. Sequi nemo blanditiis, qui
          laudantium deserunt dignissimos corrupti illum enim voluptatum cumque.
        </p>
      </div>
      <div className="w-1/6 bg-white flex justify-center items-center text-black rounded-r-lg">
        <Image
          src="/icons/status-sukses.svg"
          alt="icon sukses"
          width={40}
          height={40}
        />
      </div>
      <button className="absolute top-2 right-2 bg-white">
        <Image src="/icons/edit.svg" alt="your icon" width={25} height={25} />
      </button>
    </div>
  );
};
export default HabitItem;
