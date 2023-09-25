import { useDispatch, useSelector } from "react-redux";
import { Datepicker } from "flowbite-react";
import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import type {
  InferGetServerSidePropsType,
  GetStaticProps,
  GetServerSideProps,
} from "next";
import { useState, useEffect, useMemo } from "react";

import Header from "./Header";
import HabitSidebar from "./Habit/Detail/HabitSidebar";
import ConfirmationModal from "./ConfirmationModal";
import HabitList from "./Habit/HabitList";
import { openSidebar } from "@/redux/features/habitSidebar/habitSidebarSlice";

const LayoutDashboard = ({ user }: { user: any }) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const changeDate = (val: any) => {
    const format = moment(val).format("YYYY-MM-DD");
    setDate(format);
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
              maxDate={new Date()}
              className="w-full"
              onSelectedDateChanged={changeDate}
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
      <HabitSidebar />
    </>
  );
};

export default LayoutDashboard;
