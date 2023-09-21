// Gk jadi dipake
import Gravatar from "../Gravatar";
import Sidebar from "./Sidebar";

export default function LayoutDashboard({children, user} : {children: React.ReactNode, user:any}) {
  return (
    <div className="flex w-full bg-ds-white-100 min-h-[100vh]">
      <Sidebar />
      <div className="w-[92%] p-4 px-20">
        <div className="w-full p-6 bg-white text-black border shadow rounded-xl flex justify-between">
          <div>
            <p className="text-2xl font-semibold text-gray-500">Dashboard</p>
          </div>
          <div className="font-normal text-sm flex items-center">
            <p className="mx-2">
              Hi, Kak{" "}
              <span className="text-ds-blue-100 font-semibold">
                {user.name}
              </span>
            </p>
            <Gravatar name={user.name} />
          </div>
        </div>
        <div className="w-full my-10">
            {children}
        </div>
      </div>
    </div>
  );
}
