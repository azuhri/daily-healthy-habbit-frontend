import { ChangeEvent } from "react";

function InputForm({
  type,
  value,
  onChange,
  label,
  title,
  placeholder,
  showLabel = true,
}: {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  title?: string;
  placeholder?: string;
  showLabel?: boolean;
}) {
  return (
    <div className="my-2 flex flex-col">
      {showLabel && (
        <label htmlFor={type} className="my-1 text-ds-tosca-200 text-md">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={value}
        required
        title={title}
        className="border-2 focus:outline-none focus:border-ds-blue-100 px-4 text-gray-500 border-gray-300 shadow p-2 py-3 rounded-lg"
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputForm;
