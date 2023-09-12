import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import $ from "jquery";

export default function HeaderLandingPage() {
  const [isHideNavbar, setIsHideNavbar] = useState(false);
  const dNone = {
    display: "none",
  };

  const showNavbarResponsive = () => {
    if (!isHideNavbar) {
      $("#listNavbarMobile").slideDown(300);
      $("#hamburger").hide(200);
      $("#closeNavbar").show(200);
      setIsHideNavbar(true);
    } else {
      $("#listNavbarMobile").slideUp(300);
      $("#closeNavbar").hide(200);
      $("#hamburger").show(200);
      setIsHideNavbar(false);
    }
  }

  return (
    <>
      <header
        id="navbar"
        className="hidden transition ease-in fixed z-10 top-0 w-full text-black  py-4 md:flex items-center justify-between px-32"
      >
        <div>
          <div className="flex justify-center items-center">
            <Image
              src="/icons/new-logo.png"
              alt="Daily Healthy Habit Icon"
              width="50"
              height={0}
              className="mx-4"
            />
            <p className="font-semibold text-gray-600">
              {" "}
              Daily <span className="text-ds-tosca-100">Healthy</span> Habit
            </p>
          </div>
        </div>
        <div>
          <ul className="flex">
            <li
              id="featureNav"
              className="mx-6 transition ease-in-out delay-150"
            >
              <Link href="#FeatureSection">Fitur</Link>
            </li>
            <li
              id="howToUseNav"
              className="mx-6 transition ease-in-out delay-150"
            >
              <a href="#HowToUseSection">Tentang Aplikasi</a>
            </li>
            <li 
              id="contactUsNav"
              className="mx-6 transition ease-in-out delay-150">
              
              <Link href="#contacUsSection">Kontak Kami</Link>
            </li>
            <li 
              id="FAQNav"
              className="mx-6 transition ease-in-out delay-150">
              <Link href="#FAQSection">FAQ</Link>
            </li>
            {/* <li id="blogNav" className="mx-6 transition ease-in-out delay-150">
              <a href="#BlogSection">Blog</a>
            </li> */}
            {/* <li className="mx-6">
              <Link href="/register">Register</Link>
            </li>
            <li className="mx-6">
              <Link
                href="/login"
                className="bg-ds-blue-100 px-6 rounded-lg py-2 text-white"
              >
                Sign In
              </Link>
            </li>*/}
          </ul> 
        </div>
      </header>
      <header className="md:hidden bg-gray-50 shadow-md fixed z-10 top-0 w-full text-black  py-4 px-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/icons/new-logo.png"
              alt="Daily Healthy Habit Icon"
              width="45"
              height={0}
              className="mx-2"
            />
            <p className="text-sm text-gray-600 font-semibold">Daily <span className="text-ds-tosca-200">Healthy</span> Habit</p>
          </div>
          <button onClick={showNavbarResponsive} className="mr-6">
            <svg
              id="hamburger"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="css-i6dzq1"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg
              id="closeNavbar"
              style={dNone}
              viewBox="0 0 24 24"
              width="30"
              height="30"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="css-i6dzq1"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className=" mt-6 mb-4 px-4" id="listNavbarMobile" style={dNone}>
          <ul className="text-xs font-normal">
            <li className="my-4">
              <Link href="#FeatureSection">Fitur</Link>
            </li>
            <li className="my-4">
              <Link href="#HowToUseSection">Tentang Aplikasi</Link>
            </li>
            <li className="my-4">
              <Link href="#contacUsSection">Kontak Kami</Link>
            </li>
            <li className="my-4">
              <Link href="#FAQSection">FAQ</Link>
            </li>
            {/* <li className="my-4">
              <Link href="/register">Register</Link>
            </li>
            <li className="my-6">
              <Link
                href="/login"
                className="bg-ds-blue-100 px-6 w-full rounded-lg py-2 text-white"
              >
                Sign In
              </Link>
            </li> */}
          </ul>
        </div>
      </header>
    </>
  );
}
