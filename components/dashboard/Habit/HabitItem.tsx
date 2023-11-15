import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openSidebar,
  closeSidebar,
} from "@/redux/features/habitSidebar/habitSidebarSlice";
import { openModal } from "@/redux/features/modal/modalSlice";
import axios from "axios";
import { setHabits } from "@/redux/features/habits/habitsSlice";
import moment from "moment";
import "moment/locale/id";
import Loading from "@/components/loadingButton";

type HabitItemProps = {
  data: {
    id: number;
    name: string;
    description: string;
    type: string;
    start_time: string;
    target_perday: number;
    progress: number | string;
    color: number;
  };
  index: number;
  access_token: string;
  isHabitLoading: boolean;
  isLoading: boolean;
  setIsLoading: Function;
  progressLoadingStates: boolean[];
};

const HabitItem = ({
  data,
  index,
  access_token,
  isHabitLoading,
  isLoading,
  setIsLoading,
  progressLoadingStates,
}: HabitItemProps) => {
  const [color, setColor] = useState("");
  const [colorLabel, setColorLabel] = useState("");
  const [label, setLabel] = useState("");
  const dispatch = useDispatch();
  const { date } = useSelector((state: any) => state.time);
  const today = moment().locale("id").startOf("day");
  const isAfterToday = moment(date).isAfter(today);

  useEffect(() => {
    switch (data.color) {
      case 0:
        setColor("bg-[#60a588]");
        break;
      case 1:
        setColor("bg-[#8373a0]");
        break;
      case 2:
        setColor("bg-[#5686aa]");
        break;
      case 3:
        setColor("bg-[#a5647c]");
        break;
      case 4:
        setColor("bg-[#4d9b9d]");
        break;
      case 5:
        setColor("bg-[#d58734]");
        break;
      case 6:
        setColor("bg-[#46aab9]");
        break;
      case 7:
        setColor("bg-[#E17055]");
        break;
    }

    switch (data.type) {
      case "daily":
        setColorLabel("bg-[#BFE0FF]");
        setLabel("Setiap Hari");
        break;
      case "weekly":
        setColorLabel("bg-[#C8BFFF]");
        setLabel("Perminggu");
        break;
      case "monthly":
        setColorLabel("bg-[#FCC2FC]");
        setLabel("Perbulan");
        break;
      case "interval_day":
        setColorLabel("bg-[#FCC5C2]");
        setLabel("Interval");
        break;
    }
  }, [data]);

  const handleProgressNoTarget = async () => {
    const API =
      process.env.API || "https://staging-api-health2023.agileteknik.com";
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    const url = `${API}/api/v2/habbit/progress/${data.id}?date=${date}`;

    if (progressLoadingStates.includes(true)) return;
    console.log(data.progress);
    setIsLoading(true);

    switch (data.progress) {
      case "completed":
        await axios.post(url, { status_progress: "incompleted" }, config);
        break;
      case "pending":
        moment(date).isBefore(today)
          ? await axios.post(url, { status_progress: "incompleted" }, config)
          : await axios.post(url, { status_progress: "completed" }, config);
        break;
      case "incompleted":
        moment(date).isBefore(today)
          ? await axios.post(url, { status_progress: "completed" }, config)
          : await axios.post(url, { status_progress: "pending" }, config);
        break;
    }
    const response = await axios.get(`${API}/api/v2/user?date=${date}`, config);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsLoading(false);
    console.log(response);
    if (response.status === 200) {
      dispatch(
        setHabits(response.data.data.sort((a: any, b: any) => b.id - a.id))
      );
    } else {
      throw new Error(response.statusText);
    }
  };

  useEffect(() => {
    if (isHabitLoading) return;
    if (data.progress == "pending" && moment(date).isBefore(today)) {
      handleProgressNoTarget();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHabitLoading]);

  return (
    <div
      className={`relative bg-ds-gray shadow-md flex rounded-lg w-full ${
        isAfterToday ? "bg-opacity-50" : "hover:bg-gray-300 cursor-pointer"
      } min-h-[100px] max-h-28 m-1`}
      onClick={() => {
        if (isAfterToday) return;
        if (data.target_perday == null) {
          handleProgressNoTarget();
        } else {
          dispatch(openModal({ type: "progress", id: data.id }));
        }
      }}
    >
      <div
        className={`w-1/6 h-full ${color} rounded-l-lg ${
          isAfterToday && "bg-opacity-50"
        }`}
      />
      <div
        className={`w-4/6 h-full text-black text-gray-600 px-3 flex justify-center flex-col ${
          isAfterToday && "opacity-50"
        }`}
      >
        <h1 className="font-bold line-clamp-1">{data.name}</h1>
        <div className="flex space-x-2 flex items-center text-xs my-1">
          <p className="text-xs font-light flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="12"
              viewBox="0 0 9 12"
              fill="none"
            >
              <path
                d="M4.50073 12C5.15331 12 5.68725 11.4462 5.68725 10.7692H3.31422C3.31422 11.0957 3.43922 11.4087 3.66174 11.6395C3.88425 11.8703 4.18605 12 4.50073 12ZM8.06027 8.30769V5.23077C8.06027 3.34154 7.08733 1.76 5.39062 1.34154V0.923077C5.39062 0.412308 4.99313 0 4.50073 0C4.00833 0 3.61085 0.412308 3.61085 0.923077V1.34154C1.9082 1.76 0.941189 3.33538 0.941189 5.23077V8.30769L0.175887 9.10154C-0.197865 9.48923 0.0631683 10.1538 0.591167 10.1538H8.40436C8.93236 10.1538 9.19933 9.48923 8.82558 9.10154L8.06027 8.30769Z"
                fill="#2C818B"
              />
            </svg>
            <span className="mx-1">{data.start_time}</span>
          </p>
          {typeof data.progress == "number" ? (
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
              >
                <path
                  d="M4.90036 2.1V3.5C4.20721 3.49876 3.52931 3.70336 2.95258 4.08786C2.37586 4.47236 1.92629 5.01944 1.66087 5.65976C1.39544 6.30007 1.32612 7.00478 1.46169 7.68454C1.59726 8.36429 1.93161 8.98849 2.42236 9.478L1.43536 10.465C0.750007 9.77972 0.283271 8.90659 0.0941737 7.95604C-0.0949232 7.00549 0.00211378 6.0202 0.373012 5.1248C0.743911 4.2294 1.37201 3.4641 2.17788 2.92569C2.98374 2.38727 3.93118 2.09993 4.90036 2.1ZM8.36536 3.535C9.0507 4.22028 9.51744 5.09341 9.70654 6.04396C9.89563 6.99451 9.7986 7.97979 9.4277 8.8752C9.0568 9.7706 8.4287 10.5359 7.62283 11.0743C6.81697 11.6127 5.86954 11.9001 4.90036 11.9V10.5C5.5935 10.5012 6.2714 10.2966 6.84813 9.91214C7.42485 9.52764 7.87442 8.98056 8.13985 8.34024C8.40527 7.69993 8.47459 6.99522 8.33902 6.31546C8.20345 5.63571 7.8691 5.01151 7.37836 4.522L8.36536 3.535ZM4.90036 14L2.10036 11.2L4.90036 8.4V14ZM4.90036 5.6V0L7.70036 2.8L4.90036 5.6Z"
                  fill="#2C818B"
                />
              </svg>
              <span className="mx-1">x</span>
              {data.progress}
            </p>
          ) : (
            ""
          )}
          <button
            className={`p-1 px-2 rounded-xl font-normal shadow text-[9px] ${colorLabel}`}
          >
            {label}
          </button>
        </div>
        <p className="pt-3 text-xs line-clamp-2">{data.description}</p>
      </div>
      <div className="w-1/6 flex justify-center items-center text-black rounded-r-lg">
        {isLoading ? (
          <Loading />
        ) : (
          {
            completed: (
              <button className="p-[3px] shadow border border-mobile-green-200 bg-mobile-green-200 text-mobile-green-100 rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            ),
            pending: (
              <button className="p-[4px] shadow border border-yellow-300 bg-yellow-300 text-white rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </button>
            ),
            incompleted: (
              <button className="p-[4px] shadow border border-red-200 bg-red-200 text-mobile-red-200 rounded-full">
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            ),
            afterToday: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="gray"
                className="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                  clip-rule="evenodd"
                />
              </svg>
            ),
          }[
            (() => {
              if (isAfterToday) {
                return "afterToday";
              }

              if (typeof data.progress === "number") {
                if (data.progress >= data.target_perday) {
                  return "completed";
                } else if (
                  data.progress < data.target_perday &&
                  moment(date).isBefore(today)
                ) {
                  return "incompleted";
                } else {
                  return "pending";
                }
              } else {
                return data.progress as "completed" | "pending" | "incompleted";
              }
            })()
          ]
        )}
      </div>
      <div className="absolute top-2 right-2">
        <Image
          src="icons/edit.svg"
          width={25}
          height={25}
          alt="edit"
          className="cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            dispatch(openSidebar({ type: "edit", index: index }));
          }}
        />
      </div>
    </div>
  );
};
export default HabitItem;
