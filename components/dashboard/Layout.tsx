import { selectAuthState } from "@/features/test/testSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import HabitSidebar from "./Habit/Detail/HabitSidebar";
import ConfirmationModal from "./ConfirmationModal";
import { use } from "react";
import { useState } from "react";

const LayoutDashboard = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  

  return (
    <>
      <div className="bg-gradient-dashboard min-h-screen w-full px-8 flex flex-col py-8">
        <Header user={user} />
        <div className="flex flex-row justify-between pt-8 text-black">
          <div>
            <h1 className="text-2xl font-semibold">Halo, {user.name}!</h1>
            <p className="text-xs">
              Berikut daftar
              <span className="text-primary-100"> Habit </span>
              pada
              <span className="text-primary-100">
                &nbsp;Hari (September 12, 1998)
              </span>
            </p>
          </div>
          <div>
            <p className="text-black">Kalender</p>
          </div>
        </div>
        {children}
      </div>
      <button className="fixed bottom-10 shadow-xl right-8 bg-primary-100 text-white px-2 rounded-full text-6xl hover:bg-primary-hover">
        +
      </button>
      {/* Tambahin logika Show Sidebar */}
      {/* <HabitSidebar type="edit" /> */}
      {/* <ConfirmationModal
        title="Apakah Anda yakin ingin keluar?"
        imagePath="/images/konfirmasi-logout.svg"
      /> */}
    </>
  );
};

export default LayoutDashboard;
