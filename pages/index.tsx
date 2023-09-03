import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import HeaderLandingPage from "@/components/landing_page/Header";
import Hero from "@/components/landing_page/Hero";
import GetApp from "@/components/landing_page/GetApp";
import Blog from "@/components/landing_page/BlogGrid/Blog";
import Footer from "@/components/landing_page/Footer";
import Docs from "@/components/landing_page/docs/Docs";
import Circle from "@/components/landing_page/components/Circle";
import { useEffect } from "react";
import $ from "jquery";
import Feature from "@/components/landing_page/Feature/Feature";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  useEffect(() => {
    $(document).ready(function () {
      $(window).scroll(function () {
        
        var navbar = $("#navbar");
        var scrollPos = $(window).scrollTop();
        console.log(scrollPos);

        if (scrollPos >= 500) {
          navbar.addClass("bg-white shadow");
        } else if (scrollPos == 0) {
          navbar.removeClass("bg-white shadow");
        }

        if(scrollPos >= 940 && scrollPos <= 1900) {
          $("#featureNav").addClass("border-b-2 text-ds-blue-100 border-b-ds-blue-100 pb-2")
        } else {
          $("#featureNav").removeClass("border-b-2 text-ds-blue-100 border-b-ds-blue-100 pb-2")
        }

        if(scrollPos > 1900 && scrollPos <= 3458) {
          $("#howToUseNav").addClass("border-b-2 text-ds-blue-100 border-b-ds-blue-100 pb-2")
        } else {
          $("#howToUseNav").removeClass("border-b-2 text-ds-blue-100 border-b-ds-blue-100 pb-2")
        }

        if(scrollPos >= 4400) {
          $("#blogNav").addClass("border-b-2 text-ds-blue-100 border-b-ds-blue-100 pb-2")
        } else {
          $("#blogNav").removeClass("border-b-2 text-ds-blue-100 border-b-ds-blue-100 pb-2")
        }
      });
    });
  }, []);
  return (
    <>
      <Head>
        <title>Daily Habit | Landing Page</title>
      </Head>
      <HeaderLandingPage />
      <Hero />
      <Feature />
      <Docs />
      <GetApp />
      <Blog />
      <Footer />
    </>
  );
}
