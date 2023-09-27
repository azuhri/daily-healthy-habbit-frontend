import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { openSidebar } from "@/redux/features/habitSidebar/habitSidebarSlice";

const HabitItem = ({ data }: { data: any }) => {
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [data]);

  return (
    <div
      className="cursor-pointer hover:bg-gray-300 relative shadow-md flex rounded-lg w-full bg-ds-gray min-h-[100px] max-h-28 m-1"
      onClick={() => dispatch(openSidebar({ type: "edit", data: data }))}
    >
      <div className={`w-1/6 h-full ${color} rounded-l-lg`} />
      <div className="w-4/6 h-full text-black text-gray-600 px-3 flex justify-center flex-col">
        <h1 className="font-bold">{data.name}</h1>
        <div className="flex space-x-2 text-xs">
          <p className="text-xs font-light">• {data.start_time} </p>
          {typeof data.progress == "number" ? (
            <p>• Saat ini: {data.progress}</p>
          ) : (
            ""
          )}
        </div>
        <p className="pt-3 text-xs line-clamp-2">{data.description}</p>
      </div>
      <div className="w-1/6 flex justify-center items-center text-black rounded-r-lg">
        {(typeof data.progress == "string" && data.progress == "completed") ||
        data.progress == data.target_perday ? (
          <button className="p-[3px] shadow border border-mobile-green-200 bg-mobile-green-200 text-mobile-green-100 rounded-full">
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
        ) : (
          ""
        )}
        {(typeof data.progress == "string" && data.progress == "pending") ||
        data.progress < data.target_perday ? (
          <button className="p-[4px] shadow border border-yellow-300 bg-yellow-300 text-white rounded-full">
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </button>
        ) : (
          ""
        )}
        {typeof data.progress == "string" && data.progress == "incompleted" ? (
          <button className="p-[4px] shadow border border-red-200 bg-red-200 text-mobile-red-200 rounded-full">
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="css-i6dzq1"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default HabitItem;
