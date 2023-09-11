import Image from "next/image";

export default function LeftAppRightText() {
  return (
    <div className="my-5">
      <div className="flex md:flex-row flex-col" data-aos="fade-left">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center relative">
            <Image
              src="/images/demo1.png"
              alt="Daily Healthy Habit Icon"
              width="400"
              height={0}
            />
        </div>
        <div className="w-full md:w-1/2 flex justify-center flex-col">
          <div className="flex mx-8 text-justify flex-col">
            <p className="font-semibold text-gray-500 text-3xl text-center">LOREM IPSUM</p>
            <p className="text-black text-lg my-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Necessitatibus nihil ea adipisci architecto, velit odit modi ad
              ducimus magnam rerum exercitationem sequi assumenda quidem
              repudiandae eligendi libero, atque ab dolore.Lorem ipsum, dolor
              sit amet consectetur adipisicing elit. Necessitatibus nihil ea
              adipisci architecto, velit odit modi ad ducimus magnam rerum
              exercitationem sequi assumenda quidem repudiandae eligendi libero,
              atque ab dolore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
