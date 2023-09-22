import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  return (
    <div className="grid grid-cols-3 items-center">
      <div>
        <Link href="#" className="flex">
          <Image
            src="/icons/new-logo.png"
            alt="Daily Healthy Habit Icon"
            width="60"
            height={0}
            className="object-contain"
          />
          <p className="font-semibold text-gray-500 ml-2 text-sm">
            Daily
            <br /> <span className="text-primary-100">Healthy</span>
            <br /> Habit
          </p>
        </Link>
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
        <div className="group relative text-black">
          <button className="flex items-center space-x-2">
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
          <nav className="invisible rounded w-60 absolute right-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
            <ul className="my-2 divide-y bg-white">
              <li>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Akun
                </Link>
              </li>
              <li>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Akun
                </Link>
              </li>
              <li>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Akun
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
