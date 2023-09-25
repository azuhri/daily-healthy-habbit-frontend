import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetServerSideProps,
} from "next";
import $ from "jquery";
import { getServerSideProps } from "@/lib/getSession";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Gravatar from "@/components/Gravatar";
import Sidebar from "@/components/dashboard/Sidebar";
import LayoutDashboard from "@/components/dashboard/Layout";
import HabitList from "@/components/dashboard/Habit/HabitList";

const DashboardPage = ({ user, date }: {
  user:any,
  date: any
}) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <LayoutDashboard user={user}>
        {/* Habit Kosong */}
        {/* <div className="flex-grow flex-col flex justify-center items-center">
          <Image
            src="/images/dashboard-kosong.svg"
            alt="Centered Image"
            width={250}
            height={0}
          />
          <h1 className="text-primary-100 text-2xl pt-4 font-semibold">
            Ayoooo buat Habitmu !!
          </h1>
        </div> */}
        {/* Habit Ada */}
        {/* <div className="flex flex-col flex-grow">
          <div className="flex-grow pt-8">
            <HabitList access_token={user.token}  date={date} />
          </div>
        </div> */}
      </LayoutDashboard>
      {/* Punya Azis yg kemaren 
      <LayoutDashboard user={user}>
        <div className="grid grid-cols-2 mt-10">
          <div className="flex col-span-2 mt-2 sm:col-span-1 mr-4 shadow rounded-xl border">
            <div className="bg-cyan-500 flex items-center justify-center text-white w-1/4 p-2 py-8 rounded-tl-xl rounded-bl-xl">
              <svg
                viewBox="0 0 24 24"
                width="100"
                height="100"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="css-i6dzq1"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className="bg-[#009FBD7A] w-3/4 rounded-tr-xl rounded-br-xl p-2 px-4 flex flex-col justify-center">
              <p className="text-white font-normal text-2xl text-center">
                Total Habit
              </p>
              <p className="text-white font-bold text-8xl text-center mt-2 w-full drop-shadow-xl">
                0
              </p>
            </div>
          </div>
          <div className="flex col-span-2 mt-2 sm:col-span-1 ml-4 shadow rounded-xl border">
            <div className="bg-green-500 flex items-center justify-center text-white w-1/4 p-2 py-8 rounded-tl-xl rounded-bl-xl">
              <svg
                viewBox="0 0 24 24"
                width="100"
                height="100"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="css-i6dzq1"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="bg-green-400 w-3/4 rounded-tr-xl rounded-br-xl p-2 px-4 flex flex-col justify-center">
              <p className="text-white font-normal text-2xl text-center">
                Target Habit Sukses
              </p>
              <p className="text-white font-bold text-8xl text-center mt-2 w-full drop-shadow-xl">
                0
              </p>
            </div>
          </div>
        </div>
      </LayoutDashboard> */}
    </>
  );
};

export { getServerSideProps };
export default DashboardPage;
