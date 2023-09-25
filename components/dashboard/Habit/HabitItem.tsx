import Image from "next/image";
import { useState, useEffect } from "react";

const HabitItem = ({data}:{data:any}) => {
  
  return (
    <div className="cursor-pointer hover:bg-gray-300 relative shadow-md flex rounded-lg w-full bg-ds-gray min-h-[100px] max-h-28 my-1">
      <div className={`w-1/6 h-full bg-mobile-color-${data.color+1} rounded-l-lg `} />
      <div className="w-4/6 h-full text-black text-gray-600 px-3 flex justify-center flex-col">
        <h1 className="font-bold">{data.name}</h1>
        <div className="flex space-x-2 text-xs">
          <p className="text-xs font-light">• {data.start_time} </p>
          {typeof data.progress == "number" ? <p>• Saat ini: {data.progress}</p> : ""}
        </div>
        <p className="pt-3 text-xs line-clamp-2">
          {data.description}
        </p>
      </div>
      <div className="w-1/6 flex justify-center items-center text-black rounded-r-lg">
        {(typeof data.progress == "string" && data.progress == "completed") || data.progress == data.target_per_day  ? <button className="p-[3px] shadow border border-mobile-green-200 bg-mobile-green-200 text-mobile-green-100 rounded-full">
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </button> : ""}
        {(typeof data.progress == "string" && data.progress == "pending") || data.progress < data.target_per_day  ?
         <button className="p-[4px] shadow border border-yellow-300 bg-yellow-300 text-white rounded-full">
         <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
       </button> : ""}
       {(typeof data.progress == "string" && data.progress == "incompleted") ?
         <button className="p-[4px] shadow border border-red-200 bg-red-200 text-mobile-red-200 rounded-full">
         <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
         </button> : ""}
        {/* <button className="p-[4px] shadow border border-yellow-300 bg-yellow-300 text-white rounded-full">
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </button> */}
        {/* <button className="p-[4px] shadow border border-red-200 bg-red-200 text-mobile-red-200 rounded-full">
        <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" className="css-i6dzq1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button> */}
        {/* <Image
          src="/icons/status-sukses.svg"
          alt="icon sukses"
          width={40}
          height={40}
        /> */}
      </div>
      {/* <button className="absolute top-2 right-2">
        <Image src="/icons/edit.svg" alt="your icon" width={25} height={25} />
      </button> */}
    </div>
  );
};
export default HabitItem;
