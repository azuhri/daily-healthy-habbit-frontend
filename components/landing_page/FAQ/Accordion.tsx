import { useState } from "react";
import $ from "jquery";

interface ContentAccordion {
  title: string;
  desc: string;
}

export default function Accordion({ title, desc }: ContentAccordion) {
  const [isHide, setIsHide] = useState(false);
  const dNone = {
    display: "none",
  };

  const openArcodion = (event: any) => {
    if (!isHide) {
      $(".accordion").slideDown(300);
      setIsHide(true);
      $(".upAccordion").hide(300);
      $(".downAccordion").show(300);
    } else {
      $(".accordion").slideUp(300);
      setIsHide(false);
      $(".downAccordion").hide(300);
      $(".upAccordion").show(300);
    }
  };

  return (
    <button
      onClick={openArcodion}
      data-hide="true"
      className="button-accordion my-4 bg-gray-100 text-gray-500 shadow-lg px-6 md:px-10  py-2 rounded-xl relative"
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
            style={dNone}
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
      <div className="my-2 accordion text-left text-sm py-4" style={dNone}>
        <p>{desc}</p>
      </div>
    </button>
  );
}
