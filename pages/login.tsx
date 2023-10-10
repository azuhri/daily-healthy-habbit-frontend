import iconDailyHabit from "public/icons/new-logo.png";
import ilustration from "public/images/ilustrasi-login.png";
import Image from "next/image";
import Link from "next/link";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetServerSideProps,
} from "next";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import $ from "jquery";
import { log } from "console";
import Loading from "@/components/loadingButton";
import Head from "next/head";

import InputForm from "@/components/forms/InputForm";

export const getServerSideProps: GetServerSideProps = async () => {
  const API = process.env.API;

  return {
    props: {
      API,
    },
  };
};

const displayNone = {
  display: "none",
};

export default function LoginPage({ API }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const formLogin = async (el: any) => {
    el.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/login`, {
        email,
        password,
      });
      router.push("/dashboard");
    } catch (error: any) {
      const { data } = error.response;

      $("#responseMessage").html(`${data.message}`);
      $("#responseMessage").show(300);
      setTimeout(() => {
        $("#responseMessage").hide(300);
      }, 3000);
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex">
      <Head>
        <title>Daily Habit | Login</title>
      </Head>
      <div className="w-full md:w-1/2 md:px-[100px] px-10 flex justify-center items-center bg-white flex-col relative">
        <Link
          href="/"
          className="absolute top-0 mt-8 flex flex-col justify-center items-center"
        >
          <Image
            src="/icons/new-logo.png"
            alt="Daily Healthy Habit Icon"
            width="60"
            height={0}
          />
          <p className="font-semibold text-gray-500">
            {" "}
            Daily <span className="text-ds-tosca-100">Healthy</span> Habit
          </p>
        </Link>
        <p className="w-full text-4xl font-bold text-ds-tosca-100 mt-32">
          Masuk
        </p>
        <p className="w-full font-normal text-md text-gray-500">
          Buat Perencanaan Rutinitasmu dengan Registrasi di{" "}
          <span className="font-semibold text-ds-tosca-100">
            Daily Healthy Habit
          </span>
        </p>
        <form onSubmit={formLogin} className="my-4 w-full">
          <div
            id="responseMessage"
            style={displayNone}
            className="border-red-500 text-red-400 bg-red-200 mt-2 text-center p-3 border rounded-lg font-bold"
          ></div>
          <div className="my-2 flex flex-col">
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
              placeholder="Masukan password disini yah..."
            />
          </div>
          <div className="flex justify-end">
            <a href="#" className="text-sm font-light text-ds-tosca-200">
              Lupa password?
            </a>
          </div>
          <div className="mt-10 flex flex-col">
            {isLoading ? (
              <button className="w-full text-center bg-ds-blue-100 shadow py-4 text-white font-semibold rounded-lg text-xl">
                <Loading />
              </button>
            ) : (
              <button className="w-full text-center bg-ds-blue-100 shadow py-4 text-white font-semibold rounded-lg text-xl">
                Login
              </button>
            )}
            <span className="text-center mt-2 font-light text-md text-gray-500">
              Kamu belum punya akun ? yuk{" "}
              <Link
                href="/register"
                className="font-bold text-ds-blue-100 hover:text-color-cyan20"
              >
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gradient-to-tl from-ds-tosca-200 from-10% via-ds-tosca-100 via-50% to-blue-500 to-90%">
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
            src="/images/Ilustrasi-login2.png"
            alt="Banner Login"
            width="450"
            height="450"
            className="banner"
          />
          <p className="font-semibold text-2xl mt-6 my-2 mt-10 text-white text-center">
            Daily <span className="text-color-cyan10">Healthy</span> Habit
          </p>
          <p className="text-white font-white text-center">
            Buat rencana untuk perubahan kebiasaan lama mu
          </p>
        </div>
      </div>
    </div>
  );
}
