import { useSelector } from "react-redux";
import { Datepicker } from "flowbite-react";
import "moment/locale/id";
import type {
  InferGetServerSidePropsType,
  GetStaticProps,
  GetServerSideProps,
} from "next";
import { useState, useEffect, useMemo } from "react";

import Header from "./Header";
import HabitSidebar from "./Habit/Detail/HabitSidebar";
import HabitList from "./Habit/HabitList";
import { changeDate } from "@/redux/features/time/timeStateSlice";
import { openSidebar } from "@/redux/features/habitSidebar/habitSidebarSlice";
import moment from "moment";
import { useAppDispatch } from "@/redux/store";

const LayoutDashboard = ({ user }: { user: any }) => {
  const dispatch = useAppDispatch();
  const { date } = useSelector((state: any) => state.time);

  const handleChangeDate = (date: any) => {
    dispatch(changeDate({ date: date }));
  };

  return (
    <>
      <div className="bg-gradient-dashboard min-h-screen w-full px-8 flex flex-col py-8">
        <Header user={user} />
        <div className="flex flex-row justify-between pt-8 text-black">
          <div className="hidden md:block">
            <h1 className="text-2xl font-semibold">Halo, {user.name}!</h1>
            <p className="text-xs">
              Berikut daftar
              <span className="text-primary-100"> Habit </span>
              pada
              <span className="text-primary-100">
                &nbsp;
                {moment().locale("id").format("dddd, DD MMMM YYYY").toString()}
              </span>
            </p>
          </div>
          <div>
            <Datepicker
              className="w-full"
              onSelectedDateChanged={handleChangeDate}
            />
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex-grow pt-8">
            <HabitList access_token={user.token} date={date} />
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-10 shadow-xl right-8 bg-primary-100 text-white px-2 rounded-full text-6xl hover:bg-primary-hover"
        onClick={() => {
          dispatch(openSidebar({ type: "create" }));
        }}
      >
        +
      </button>
      <HabitSidebar user={user} />
    </>
  );
};

export default LayoutDashboard;
