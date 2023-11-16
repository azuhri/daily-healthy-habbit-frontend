import axios from "axios";
import { useEffect, useState } from "react";
import HabitItem from "./HabitItem";
import SkeletonHabit from "./SkeletonHabit";
import Image from "next/image";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { setHabits } from "@/redux/features/habits/habitsSlice";

const apiEndpoint =
  process.env.API || "https://staging-api-health2023.agileteknik.com";

const HabitList = ({ access_token }: { access_token: string }) => {
  const dispatch = useAppDispatch();
  const { filteredHabits } = useSelector((state: any) => state.habits);
  const { date } = useSelector((state: any) => state.time);

  const [isHabitLoading, setisHabitLoading] = useState(false);
  const [progressLoadingStates, setProgressLoadingStates] = useState<boolean[]>(
    []
  );

  const getDataHabit = async () => {
    try {
      const token = `Bearer ${access_token}`;
      setisHabitLoading(true);
      const response = await axios.get(
        `${apiEndpoint}/api/v2/user?date=${date}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(
          setHabits(response.data.data.sort((a: any, b: any) => b.id - a.id))
        );
      } else {
        console.log("Error:", response);
      }
      setisHabitLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(
    () => {
      getDataHabit();
      setProgressLoadingStates(new Array(filteredHabits.length).fill(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date]
  );

  if (filteredHabits.length < 1) {
    return (
      <>
        {isHabitLoading && (
          <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
            <SkeletonHabit />
            <SkeletonHabit />
            <SkeletonHabit />
          </div>
        )}
        {!isHabitLoading && (
          <div className="h-[500px] flex justify-center items-center flex-col">
            <Image
              src="/images/icon-empty.png"
              width={300}
              height={300}
              alt="empty icon"
            />
            <p className="text-xl font-bold text-cyan-800 my-2">
              Ayoo buat habitmu
            </p>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {isHabitLoading && (
        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
          <SkeletonHabit />
          <SkeletonHabit />
          <SkeletonHabit />
        </div>
      )}
      <div className="my-2 grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
        {!isHabitLoading &&
          filteredHabits.map((val: any, index: any) => (
            <HabitItem
              key={index}
              data={val}
              index={index}
              access_token={access_token}
              isHabitLoading={isHabitLoading}
              isLoading={progressLoadingStates[index]}
              setIsLoading={(isLoading: boolean) => {
                if (isLoading && progressLoadingStates.includes(true)) return;

                setProgressLoadingStates((prev) => {
                  prev[index] = isLoading;
                  return [...prev];
                });
              }}
              progressLoadingStates= {progressLoadingStates}
            />
          ))}
      </div>
    </>
  );
};

export default HabitList;
