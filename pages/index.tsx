import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import HeaderLandingPage from "@/components/landing_page/Header";
import Hero from "@/components/landing_page/Hero";
import GetApp from "@/components/landing_page/GetApp";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Daily Habit | Landing Page</title>
      </Head>
      <HeaderLandingPage />
      <Hero />
      <GetApp />
    </>
  );
}
