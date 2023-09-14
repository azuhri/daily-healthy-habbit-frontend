import Image from "next/image";
import { type } from "os";
import { useState, useEffect } from "react";

interface ContentModalDialog {
  text: string;
  isHide: boolean;
  timer?: number;
  src?: string;
  type?: string;
}

export default function ModalDialog({
  text,
  isHide = true,
  timer = 0,
  src = "/images/submit-success.png",
  type = "info",
}: ContentModalDialog) {
  const [hideModal, setHideModal] = useState(isHide);

  useEffect(() => {
    // Ketika nilai isHide berubah, perbarui hideModal sesuai dengan isHide.
    setHideModal(isHide);

    // Jika timer lebih dari 0, atur timeout untuk menyembunyikan modal.
    if (timer > 0) {
      const timeoutId = setTimeout(() => {
        setHideModal(true);
      }, timer);

      // Pastikan untuk membersihkan timeout jika komponen dibongkar.
      return () => clearTimeout(timeoutId);
    }
  }, [isHide, timer]);

  return (
    <div
      className={`${
        hideModal ? "hidden" : ""
      } transition-all duration-100 ease-in-out h-screen w-full backdrop-blur-md fixed top-0 z-[11] flex justify-center items-center`}
    >
      <div className="p-8 max-w-[500px] bg-white shadow-lg rounded-2xl flex flex-col items-center justify-center">
        <Image src={src} width={400} height={0} alt="success submit form" />
        <div
          className={`my-3 ${
            type == "info" ? "text-ds-blue-100" : "text-red-700"
          } text-center`}
        >
          <p className="text-xl font-semibold">{text}</p>
        </div>
      </div>
    </div>
  );
}
