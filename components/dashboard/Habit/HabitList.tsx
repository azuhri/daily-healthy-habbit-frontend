"use client";
import { useEffect, useState } from "react";
import HabitItem from "./HabitItem";
import SkeletonHabit from "./SkeletonHabit";
const apiEndpoint = process.env.API || 'https://staging-api-health2023.agileteknik.com';

const HabitList = ({ access_token }: {
  access_token: any
}) => {  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(Array);

  const getDataHabit = async () => {
    // Menggunakan endpoint API
    try {
      setLoading(true);
      const response = fetch(`${apiEndpoint}/api/v2/user?date=2023-09-24`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }).then((response) => response.json())
      .then((result) => setData(result.data))
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => console.error('Error:', error));
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    getDataHabit();
  }, []);
  console.log(data);
  
  if(data.length < 1) {
    return (
      <div>
        data kosong
      </div>
    )
  }  
  
  return (
    <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2">
      {loading ? <SkeletonHabit /> : ""}
      {data.map((val: any, index: any) => (
        <HabitItem 
          key={index}
          data={val}
        />
      ))}
    </div>
  );
};

export default HabitList;
