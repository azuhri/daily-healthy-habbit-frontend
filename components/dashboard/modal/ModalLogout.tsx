import { useState } from "react";
import { Modal } from "flowbite-react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

export default function ModalLogout({ props }: any) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const url = "/api/logout";
      await axios.post(url);
      router.push("/login");
      props.setOpenModal(undefined);
    } catch (error) {
      console.error("Terjadi kesalahan saat logout:", error);
    }
  };

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        show={props.openModal === "pop-up"}
        size="xl"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center flex flex-col items-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Apakah Kamu yakin{" "}
              <span className="font-semibold text-red-500">ingin logout</span> ?
            </h3>
            <Image
              src="/images/logout.png"
              alt="Search Icon"
              width={200}
              height={200}
              className="my-4"
            />
            <div className="flex justify-center gap-4">
              <button
                className="p-2 rounded-lg shadow bg-ds-cyan20 text-white"
                onClick={handleLogout}
              >
                Iyaa
              </button>
              <button
                className="p-2 rounded-lg shadow bg-gray-500 text-white"
                onClick={() => props.setOpenModal(undefined)}
              >
                Engga Jadi, Deh
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
