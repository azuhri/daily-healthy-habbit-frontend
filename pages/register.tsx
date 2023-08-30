import Loading from "@/components/loadingButton";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

const displayNone = {
  display: "none",
};

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const InputForm = (
    label: string,
    type: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    title: string,
    placeholder: string
  ) => {
    return (
      <div className="my-2 flex flex-col">
        <label htmlFor={type} className="my-1 text-ds-tosca-200 text-md">
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          id="email"
          required
          title={title}
          className="border-2 focus:outline-none focus:border-ds-blue-100 px-4 text-gray-500 border-gray-300 shadow p-2 py-3 rounded-lg"
          placeholder={placeholder}
        />
      </div>
    );
  };

  const formRegister = () => {
    return (
      <div className="w-full flex items-center">
        <form className="my-4 w-full flex flex-col justify-center">
          {InputForm(
            "Nama",
            "text",
            nama,
            (e: ChangeEvent<HTMLInputElement>) => setNama(e.target.value),
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

  return (
    <div className="min-h-[100vh] w-full flex overflow-y-auto bg-white">
      <Head>
        <title>Daily Habit | Register</title>
      </Head>
      <div className="hidden sm:block sm:w-1/2 bg-gradient-to-tl from-ds-tosca-200 from-10% via-ds-tosca-100 via-50% to-blue-500 to-90%">
        <div className="flex h-full p-4 justify-center items-center flex-col">
          <style global jsx>{`
            .banner {
              position: relative;
              animation: moveUpDown 3s linear infinite;
            }
            @keyframes moveUpDown {
              0% {
                top: 0;
              }

              50% {
                top: 30px;
                /* Atur ketinggian maksimal pergerakan gambar */
              }

              100% {
                top: 0;
              }
            }
          `}</style>
          <Image
            src="/images/ilustrasi-register.png"
            alt="Banner Register"
            width="450"
            height="450"
            className="banner"
          />
          <p className="font-semibold text-2xl mt-10 text-white text-center">
            Daily <span className="text-color-cyan10">Healthy</span> Habit
          </p>
          <p className="text-white font-white text-center">
            Mulai kebiasaan baik dengan perencanaan setiap hari
          </p>
        </div>
      </div>
      <div className="w-full sm:w-1/2 sm:px-[100px] px-10 flex justify-center items-center bg-white flex-col relative">
          <div className="absolute top-0 mt-8 flex flex-col justify-center items-center">
            <Image
              src="/images/logo.png"
              alt="Daily Healthy Habit Icon"
              width="80"
              height={0}
            />
            <p className="font-semibold text-gray-500">
              {" "}
              Daily <span className="text-ds-tosca-100">Healthy</span> Habit
            </p>
          </div>
        <div className="flex flex-col mt-32 items-center">
          <p className="w-full text-4xl font-bold text-ds-tosca-100">Daftar</p>
          <p className="w-full font-normal text-md text-gray-500">
            Buat Perencanaan Rutinitasmu dengan Registrasi di{" "}
            <span className="font-semibold text-ds-tosca-100">
              Daily Healthy Habit
            </span>
          </p>
          {formRegister()}
        </div>
      </div>
    </div>
  );
}
