import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Gravatar from "../Gravatar";
import ModalLogout from "./modal/ModalLogout";

const Header = ({user}:any) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  return (
    <div className="grid grid-cols-7 items-center">
      <div className="col-span-1 md:mx-0 mx-2">
        <Link href="#" className="flex">
          <Image
            src="/icons/new-logo.png"
            alt="Daily Healthy Habit Icon"
            width="60"
            height={0}
            className="object-contain"
          />
          <p className="hidden md:block font-semibold text-gray-500 ml-2 text-sm">
            Daily
            <br /> <span className="text-primary-100">Healthy</span>
            <br /> Habit
          </p>
        </Link>
      </div>

      <div className="col-span-3 md:col-span-4 mx-2 flex items-center rounded justify-center relative">
        <Image
          src="/icons/carbon-search.svg"
          alt="Search Icon"
          width={20}
          height={20}
          className="absolute left-2"
        />
        <input
          type="text"
          className="w-full px-4 my-2 text-black text-xs outline-none text-gray-500 shadow rounded-lg p-3 pl-8"
            placeholder="cari habit mu disini..."
        />
      </div>
      <div className="col-span-3 md:col-span-2 flex space-x-5 justify-end">
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
        <div className="group relative text-black">
          <button className="flex items-center space-x-2">
            {/* <Image
              src="/icons/profile.svg"
              alt="Profile Icon"
              width={20}
              height={20}
            /> */}
            <span className="flex">
              {/* <p className="text-sm">{user.name}</p> */}
              <Gravatar name={user.name} />
              <Image
                src="/icons/chevron-down.svg"
                alt="Chevron Down Icon"
                width={20}
                height={20}
              />
            </span>
          </button>
          <nav className="invisible w-56 absolute right-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 z-20">
            <ul className="my-2 bg-white rounded-lg font-semibold">
              <li>
                <h1 className="block px-4 py-2 rounded-lg text-lg">Akun</h1>
              </li>
              <hr />
              <li>
                <p className="block px-4 my-2 rounded-lg text-sm">{user.name}</p>
              </li>
              <li>
                <p className="block px-4 my-2 rounded-lg text-sm font-normal">
                  {user.email}
                </p>
              </li>
              <hr />
              <li>
                <Link
                  href="#"
                  className="block px-4 py-2 rounded-lg text-lg hover:bg-gray-100"
                >
                  Profil
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  href="#"
                  onClick={() => props.setOpenModal('pop-up')}
                  className="block px-4 py-2 rounded-lg text-lg text-danger-50 hover:bg-gray-100"
                >
                  Keluar
                </Link>
              </li>
              <li>
                <ModalLogout props={props}/>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;