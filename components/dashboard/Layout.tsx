import { selectAuthState } from "@/features/test/testSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";

const LayoutDashboard = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  console.log("authState", authState);

  return (
    <>
      <div className="bg-gradient-dashboard min-h-screen w-full">
        <Header />
      </div>
      <div className="h-screen bg-black" />
    </>
  );
};

export default LayoutDashboard;
