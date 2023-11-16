// SubmitButtons.tsx
import React from "react";

interface SubmitButtonsProps {
  sidebar: {
    type: "create" | "edit";
  };
}

export const SubmitButtons: React.FC<SubmitButtonsProps> = ({ sidebar }) => {
  return (
    <>
      {sidebar.type === "create" && (
        <div className="w-full flex justify-center">
          <button
            type="submit"
            name="create"
            className="py-2 bg-primary-100 rounded-lg w-full text-xl font-bold text-white hover:bg-primary-hover"
          >
            Buat
          </button>
        </div>
      )}
      {sidebar.type === "edit" && (
        <div className="flex gap-1 w-full mb-4">
          <button
            type="submit"
            name="edit"
            className="w-full py-2 bg-primary-100 rounded-lg text-xl font-bold text-white hover:bg-primary-hover"
          >
            Edit
          </button>
          <button
            type="submit"
            name="delete"
            className="w-full py-2 bg-danger-100 rounded-lg text-xl font-bold text-white hover:bg-danger-hover"
          >
            Hapus
          </button>
        </div>
      )}
    </>
  );
};
