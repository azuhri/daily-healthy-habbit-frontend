import Link from "next/link";
import InputForm from "./InputForm";
import Loading from "@/components/loadingButton";
import { useRouter } from "next/router";
import axios from "axios";
import $ from "jquery";

import { useState } from "react";

const displayNone = {
  display: "none",
};

const FormRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/register`, {
        name,
        email,
        password,
        password_confirmation,
      });
      router.push("/login");
    } catch (error: any) {
      const { data } = error.response;

      $("#responseMessage").html(`${data.message}`);
      $("#responseMessage").show(300);
      setTimeout(() => {
        $("#responseMessage").hide(300);
      }, 3000);
      setPassword("");
      setPassword_confirmation("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center">
      <form
        onSubmit={handleSubmit}
        className="my-4 w-full flex flex-col justify-center"
      >
        <div
          id="responseMessage"
          style={displayNone}
          className="border-red-500 text-red-400 bg-red-200 mt-2 text-center p-3 border rounded-lg font-bold"
        ></div>
        {InputForm(
          "Nama",
          "text",
          name,
          (e) => setName(e.target.value),
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
