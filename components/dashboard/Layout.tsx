import { selectAuthState } from "@/features/test/testSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Image from "next/image";

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
      <div className="bg-gradient-dashboard min-h-screen w-full px-8 flex flex-col">
        <Header />
        <div className="flex flex-row justify-between pt-8 text-black">
          <div>
            <h1 className="text-2xl font-semibold">Halo, User!</h1>
            <p className="text-xs">
              Berikut daftar
              <span className="text-primary-100"> Habit </span>
              pada Hari (September 12, 1998)
            </p>
          </div>
          <div>
            <p className="text-black">Kalender</p>
          </div>
        </div>
        {children}
      </div>

      <div className="h-screen bg-black" />
    </>
  );
};

export default LayoutDashboard;
