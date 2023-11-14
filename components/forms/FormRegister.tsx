import Link from "next/link";
import InputForm from "./InputForm";
import Loading from "@/components/loadingButton";
import { useRouter } from "next/router";
import axios from "axios";
import $ from "jquery";

import { useState } from "react";
import { useSelector } from "react-redux";

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
  const { isGuest } = useSelector((state: any) => state.guest);
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
      router.push("/dashboard");
    } catch (error: any) {
      const { data } = error.response;

      $("#responseMessage").html(`${data.message}`);
      $("#responseMessage").show(300);
      setTimeout(() => {
        $("#responseMessage").hide(300);
      }, 3000);
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
        <InputForm
          label="Nama"
          type="text"
          value={name}
          onChange={(e) => {
            if (e.target.value.length < 25) setName(e.target.value);
          }}
          placeholder="Masukan nama disini yah..."
        />
        <InputForm
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukan email disini yah..."
        />
        <InputForm
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimum 8 Karakter"
        />
        <InputForm
          label="Konfirmasi Password"
          type="password"
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
          placeholder="Masukan konfirmasi password disini yah..."
        />
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
          {!isGuest && (
            <span className="text-center mt-2 font-light text-md text-gray-500">
              Sudah punya akun ? yuk{" "}
              <Link
                href="/login"
                className="font-bold text-ds-blue-100 hover:text-color-cyan20"
              >
                Masuk
              </Link>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
