import React from 'react';
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  
  const handleLogout = async () => {
    let confirmation = confirm("Apakah Anda ingin logout?");
    if(confirmation) {
        try {
          await axios.post("/api/logout"); // Mengirim permintaan POST ke route logout
          // Redirect atau lakukan tindakan lain setelah logout berhasil
          router.push("/login"); // Contoh: Redirect ke halaman utama
        } catch (error) {
          console.error("Terjadi kesalahan saat logout:", error);
          // Handle kesalahan jika diperlukan
        }
    }
  };

  return (
    <div className="w-[8%] min-h-[100vh] flex flex-col items-center bg-white shadow-md relative">
      <div className="py-10">
        <Link
          href="/dashboard"
          className="flex flex-col justify-center items-center text-center"
        >
          <Image
            src="/icons/new-logo.png"
            alt="Daily Healthy Habit Icon"
            width="50"
            height={0}
          />
        </Link>
      </div>
      <ul>
        <li className="text-ds-blue-100 my-6">
          <Link
            href="#"
            className=" text-xs font-normal flex flex-col items-center"
          >
            <svg
              viewBox="0 0 24 24"
              width="30"
              height="30"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="css-i6dzq1"
            >
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
            <p className="my-1">Dashboard</p>
          </Link>
        </li>
        <li className="text-ds-gray my-6">
          <Link
            href="#"
            className="text-xs font-normal flex flex-col items-center"
          >
            <svg
              viewBox="0 0 24 24"
              width="30"
              height="30"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="css-i6dzq1"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <p className="my-1">Habit</p>
          </Link>
        </li>
      </ul>
      <button 
        onClick={handleLogout}
        className="absolute bottom-5 border-2 border-red-500 bg-red-100 text-red-500 p-2 rounded-lg flex items-center">
        <p className="text-sm font-semibold mr-1">Logout</p>
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="css-i6dzq1"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </button>
    </div>
  );
}
