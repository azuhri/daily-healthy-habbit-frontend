import { useSelector } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers";
import "moment/locale/id";
import { useState, useEffect, useRef } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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
  const momentDate = moment(date, "YYYY-MM-DD");

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeDate = (newDate: any) => {
    setIsOpen(false);
    dispatch(changeDate({ date: newDate }));
  };

  const changeDateMobileView = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newDate = event.currentTarget.getAttribute("data-button");
    dispatch(changeDate({ date: newDate }));
  };

  const [listDates, setListDates] = useState<
    Array<{ data: string; day: string; date: string }>
  >([]);

  const generateListDate = () => {
    const today = moment(date).locale("id");
    const data: any[] = [];

    for (let i = -15; i < 15; i++) {
      const tempDate = {
        data: today.clone().add(i, "days").format("YYYY-MM-DD"),
        day: today.clone().add(i, "days").format("ddd"),
        date: today.clone().add(i, "days").format("DD"),
      };
      data.push(tempDate);
    }

    setListDates(data);
  };

  useEffect(() => {
    generateListDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.offsetWidth;
      const scrollWidth = container.scrollWidth;
      const scrollPosition = (scrollWidth - containerWidth) / 2;
      container.scrollLeft = scrollPosition;
    }
  }, [listDates]);

  const mobileListDate = listDates.map((val, index) => (
    <button
      key={index}
      onClick={changeDateMobileView}
      data-button={val.data}
      className="flex flex-col justify-center items-center mr-3 py-2"
    >
      <p className="text-xs text-gray-500 text-semibold my-1 text-center">
        {val.day}
      </p>
      <p
        className={`text-md text-semibold text-center flex justify-center items-center w-[35px] h-[35px]  ${
          val.data === date
            ? "bg-ds-cyan20 text-white"
            : "bg-transparent text-gray-600 hover:bg-gray-300"
        } ${
          val.date === moment().locale("id").format("DD") && "ring-1"
        } rounded-full`}
      >
        {val.date}
      </p>
    </button>
  ));

  return (
    <>
      <div className="bg-gradient-dashboard min-h-screen w-full px-8 flex flex-col py-8">
        <Header user={user} />
        <div className="flex justify-between pt-8 text-black hidden md:block w-full">
          <div>
            <p className="text-xs text-gray-400">Daftar Habit pada </p>
            <h1 className="text-2xl font-bold text-primary-100">
              {momentDate.format("dddd")}
            </h1>
            <p className="text-second-100 font-semibold">
              {momentDate.format("DD MMMM YYYY")}
            </p>
            <div>
              <button
                onClick={handleOpen}
                className="flex absolute my-2 rounded-full px-3 py-1 items-center text-xs text-second-100 font-semibold bg-primary-50 hover:bg-primary-50-hover hover:text-white"
              >
                <CalendarMonthIcon />
                <p>Lihat hari lain</p>
              </button>
              <div className={`absolute z-10 max-h-0 invisible`}>
                <DatePicker open={isOpen} onChange={handleChangeDate} />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="group bg-primary-100 rounded-full px-3 py-2 text-white font-semibold flex hover:bg-primary-hover"
              onClick={() => {
                dispatch(openSidebar({ type: "create" }));
              }}
            >
              <p className="rounded-lg bg-primary-50 px-2 mr-2 group-hover:bg-primary-50-hover">
                +
              </p>
              <p className="">Habit Baru</p>
            </button>
          </div>
        </div>
        {/* Mobile View */}
        <div className="flex pt-8 text-bold flex flex-col text-gray-600 block md:hidden">
          <h1 className="text-2xl font-bold">Halo, {user.name}!</h1>
          <div
            className="overflow-x-scroll my-2 min-w-screen"
            ref={scrollContainerRef}
          >
            <div className="min-w-[75%] flex flex-start">{mobileListDate}</div>
          </div>
          <span className="mt-2 text-xs">
            Berikut daftar Habit pada Hari <br />
            <span className="font-semibold text-ds-cyan20">
              (
              {moment(date)
                .locale("id")
                .format("dddd, DD MMMM YYYY")
                .toString()}
              )
            </span>{" "}
          </span>
        </div>
        <div className="flex flex-col flex-grow">
          <HabitList access_token={user.token} />
        </div>
      </div>
      <button
        className="md:hidden fixed bottom-10 shadow-xl right-8 bg-primary-100 text-white px-2 rounded-full text-6xl hover:bg-primary-hover"
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
