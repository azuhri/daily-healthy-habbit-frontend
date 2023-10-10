import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { closeModal } from "@/redux/features/modal/modalSlice";

const ConfirmationModal = ({
  title,
  imagePath,
  onAction,
}: {
  title: string;
  imagePath: string;
  onAction: () => void;
}) => {
  const dispatch = useDispatch();
  function handleButtonClick() {
    dispatch(closeModal());
    onAction();
  }

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-gray-700 bg-opacity-70 z-40">
      <div className="rounded-lg z-50 bg-white bg-opacity-100 text-black w-fit">
        <p className="px-12 text-center font-semibold mt-6">{title}</p>
        <div className="flex justify-center">
          <Image src={imagePath} alt={title} width={150} height={0} />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="px-4 text-danger-50 rounded-bl-lg border-2 w-full py-2 hover:bg-ds-gray"
            onClick={() => dispatch(closeModal())}
          >
            Batal
          </button>
          <button
            className="px-4 rounded-br-lg border-2 w-full py-2 hover:bg-ds-gray"
            onClick={handleButtonClick}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
