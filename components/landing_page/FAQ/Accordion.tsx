import { useState } from "react";

interface ContentAccordion {
  title: string;
  desc: string;
}

export default function Accordion({ title, desc }: ContentAccordion) {
  const [isHide, setIsHide] = useState(true);

  const openAccordion = () => {
    setIsHide((prevIsHide) => !prevIsHide);
  };

  return (
    <button
      data-aos="zoom-in"
      onClick={openAccordion}
      className="button-accordion my-4 bg-gray-100 text-gray-500 shadow-lg px-6 md:px-10  py-2 rounded-xl relative transition-all duration-300 ease-in-out"
    >
      <div className="flex justify-between items-center my-4 font-bold">
        <p className="text-left">{title}</p>
        <div className="absolute right-4">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="downAccordion"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="upAccordion"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
      </div>
      <div
        className={`accordion text-left text-sm transition-all duration-500 ease-in-out ${
          isHide
            ? "max-h-0 overflow-hidden"
            : "max-h-[1000px] overflow-visible my-4 py-2"
        }`}
      >
        <p>{desc}</p>
      </div>
    </button>
  );
}
