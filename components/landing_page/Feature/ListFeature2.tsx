import React from "react";
import Image from "next/image";

interface ListFeatureProps {
  children: React.ReactNode;
  title: string;
  desc?: string;
}

export default function ListFeature({ children, title, desc }: ListFeatureProps) {
  return (
    <div className="flex flex-col justify-center items-center mx-4">
        <div className="h-[200px] shadow-lg w-[200px] bg-ds-blue-50 rounded-full flex justify-center items-center">
            <div className="h-[185px] w-[185px] border-[4px] border-white bg-blue-100 rounded-full flex justify-center items-center">
                {children}
            </div> 
        </div>
        <p className="text-lg text-ds-blue-100 font-semibold text-center my-2">{title}</p>
        <p className="text-sm text-gray-500 text-ds-blue text-center">
            {desc}
        </p>
    </div>
  );
}
