import Link from "next/link";
import Image from "next/image";

const LayoutDashboard = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  return (
    <>
      <div className="bg-gradient-dashboard min-h-screen w-full">
        <div className="grid grid-cols-3 px-4 items-center pt-4">
          <div className="flex">
            <Image
              src="/icons/new-logo.png"
              alt="Daily Healthy Habit Icon"
              width="50"
              height={0}
              className="object-contain"
            />
            <p className="font-semibold text-gray-500 ml-2 text-xs">
              Daily
              <br /> <span className="text-primary-100">Healthy</span>
              <br /> Habit
            </p>
          </div>

          <div className="flex items-center bg-white px-2 rounded justify-center">
            <Image
              src="/icons/carbon-search.svg"
              alt="Search Icon"
              width={20}
              height={20}
            />
            <input
              type="text"
              className="w-full px-4 my-2 text-black outline-none"
              //   placeholder="Search..."
            />
          </div>
          <div className="flex space-x-5 justify-end">
            <button>
              <Image
                src="/icons/question.svg"
                alt="Question Icon"
                width={20}
                height={20}
              />
            </button>
            <button>
              <Image
                src="/icons/notif-bell.svg"
                alt="Notification Bell Icon"
                width={20}
                height={20}
              />
            </button>
            <div className="border min-h-10 border-black" />
            <button className="text-black flex items-center space-x-2">
              <Image
                src="/icons/profile.svg"
                alt="Profile Icon"
                width={20}
                height={20}
              />
              <span className="flex">
                <p className="text-sm">Username</p>
                <Image
                  src="/icons/chevron-down.svg"
                  alt="Chevron Down Icon"
                  width={20}
                  height={20}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-screen bg-black" />
    </>
  );
};

export default LayoutDashboard;
