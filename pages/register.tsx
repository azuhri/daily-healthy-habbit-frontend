import Head from "next/head";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { GetStaticProps, GetServerSideProps } from "next";

import FormRegister from "@/components/forms/FormRegister";

export const getServerSideProps: GetServerSideProps = async () => {
  const API = process.env.API;

  return {
    props: {
      API,
    },
  };
};

export default function RegisterPage({ API }: any) {
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
        <div className="flex flex-col mt-32 items-center">
          <p className="w-full text-4xl font-bold text-ds-tosca-100">Daftar</p>
          <p className="w-full font-normal text-md text-gray-500">
            Buat Perencanaan Rutinitasmu dengan Registrasi di{" "}
            <span className="font-semibold text-ds-tosca-100">
              Daily Healthy Habit
            </span>
          </p>
          {FormRegister()}
        </div>
      </div>
    </div>
  );
}
