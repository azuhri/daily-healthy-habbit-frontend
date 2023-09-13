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
import ContactUs from "@/components/landing_page/ContactUs/ContactUs";
import FAQ from "@/components/landing_page/FAQ/FAQ";
import AOS from "aos";
import "aos/dist/aos.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    AOS.init();
    $(document).ready(function () {
      $(window).scroll(function () {
        var navbar = $("#navbar");
        var scrollPos = $(window).scrollTop();
        
        // Offset dari setiap section
        var featureOffset : number | undefined = $('#FeatureSection').offset().top;
        var howToUseOffset : number | undefined = $('#HowToUseSection').offset().top;
        var contactUsOffset : number | undefined = $('#contacUsSection2').offset().top;
        var faqOffset : number | undefined = $('#FAQSection2').offset().top;
    
        // Fungsi untuk menghapus kelas-kelas yang memberikan highlight pada semua menu navbar
        function removeHighlightClasses() {
          $("#featureNav, #howToUseNav, #contactUsNav, #FAQNav").removeClass(
            "border-b-2 text-ds-blue-100 border-b-ds-blue-100 pb-2"
          );
        }
    
        // Fungsi untuk menambahkan highlight ke menu navbar yang sesuai
        function highlightNavbar(navbarId: any) {
          removeHighlightClasses();
          $(navbarId).addClass("border-b-2 text-ds-blue-100 border-b-ds-blue-100 pb-2");
        }
    
        // Mengatur highlight berdasarkan posisi scroll
        if (scrollPos >= faqOffset) {
          highlightNavbar("#FAQNav");
        } else if (scrollPos >= contactUsOffset) {
          highlightNavbar("#contactUsNav");
        } else if (scrollPos >= howToUseOffset) {
          highlightNavbar("#howToUseNav");
        } else if (scrollPos >= featureOffset) {
          highlightNavbar("#featureNav");
        } else {
          removeHighlightClasses();
        }
    
        // Menambahkan atau menghapus kelas CSS pada navbar saat scrolling
        if (scrollPos >= 100) {
          navbar.addClass("bg-white shadow");
        } else {
          navbar.removeClass("bg-white shadow");
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
      {/* <Blog /> */}
      <ContactUs />
      <FAQ />
      <Footer />
    </>
  );
}
