import Link from "next/link";
import InputForm from "./InputForm";
import { useState } from "react";
import Loading from "@/components/loadingButton";

const FormRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  return (
    <div className="w-full flex items-center">
      <form className="my-4 w-full flex flex-col justify-center">
        {InputForm(
          "Nama",
          "text",
          nama,
          (e) => setNama(e.target.value),
          "Nama harus di isi yah !",
          "Masukan nama disini yah..."
        )}
        {InputForm(
          "Email",
          "email",
          email,
          (e) => setEmail(e.target.value),
          "Email harus di isi yah !",
          "Masukan email disini yah..."
        )}
        {InputForm(
          "Password",
          "password",
          password,
          (e) => setPassword(e.target.value),
          "Password harus di isi yah !",
          "Masukan password disini yah..."
        )}
        {InputForm(
          "Konfirmasi Password",
          "password",
          password_confirmation,
          (e) => setPassword_confirmation(e.target.value),
          "Konfirmasi Password harus di isi yah !",
          "Masukan password disini yah..."
        )}
        <div className="mt-10 flex flex-col">
          {isLoading ? (
            <button className="w-full text-center bg-ds-blue-100 shadow py-4 text-white font-semibold rounded-lg text-xl">
              <Loading />
            </button>
          ) : (
            <button className="w-full text-center bg-ds-blue-100 shadow py-4 text-white font-semibold rounded-lg text-xl">
              Daftar
            </button>
          )}
          <span className="text-center mt-2 font-light text-md text-gray-500">
            Sudah punya akun ? yuk{" "}
            <Link
              href="/login"
              className="font-bold text-ds-blue-100 hover:text-color-cyan20"
            >
              Masuk
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
