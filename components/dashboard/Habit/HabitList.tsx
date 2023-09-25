import axios from "axios";
import { useEffect, useState } from "react";
import HabitItem from "./HabitItem";
import SkeletonHabit from "./SkeletonHabit";
import Image from "next/image";

const apiEndpoint =
  process.env.API || "https://staging-api-health2023.agileteknik.com";

const HabitList = ({ access_token,date }: {
    access_token: string,
    date: string
   }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>(Array);

  const getDataHabit = async () => {
    try {
      const token = `Bearer ${access_token}`;
      setLoading(true);
      const response = await axios.get(
        `${apiEndpoint}/api/v2/user?date=${date}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        setData(response.data.data);
      } else {
        throw new Error(response.statusText);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getDataHabit();
  }, [date]);
  console.log(data);

  if (data.length < 1) {
    return (
      <>
        {loading && (
          <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
            <SkeletonHabit />
            <SkeletonHabit />
            <SkeletonHabit />
          </div>
        )}
        {!loading && (
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
    <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
      {loading && <SkeletonHabit />}
      {data.map((val: any, index: any) => (
        <HabitItem key={index} data={val} />
      ))}
    </div>
  );
};

export default HabitList;
