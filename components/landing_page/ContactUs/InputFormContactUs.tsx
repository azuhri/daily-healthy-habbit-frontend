import { ChangeEvent } from "react";

export default function InputFormContactUs({
  type,
  value,
  onChange,
  title,
  placeholder,
  name,
}: {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  placeholder?: string;
  name: any;
}) {
  return (
    <div className="mt-3 flex flex-col">
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={value}
        title={title}
        className="bg-gray-100 focus:outline-none focus:border-ds-blue-100 px-4 text-black border-gray-300 text-gray-600 shadow p-2 py-3 rounded-lg w-full"
        placeholder={placeholder} 
        name={name}
      />
    </div>
  );
}
