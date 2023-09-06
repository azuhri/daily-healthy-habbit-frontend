import { ChangeEvent } from "react";

export default function InputFormContactUs({
  type,
  value,
  onChange,
  title,
  placeholder,
}: {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  placeholder?: string;
}) {
  return (
    <div className="my-2 flex flex-col">
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={value}
        required
        title={title}
        className="bg-gray-100 focus:outline-none focus:border-ds-blue-100 px-4 text-black border-gray-300 shadow p-2 py-3 rounded-lg w-full"
        placeholder={placeholder}
      />
    </div>
  );
}
