import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Daily Habit | Landing Page</title>
      </Head>
      <div className="bg-white min-h-[100vh]">
        <header className="w-full text-black py-4 flex items-center justify-between px-32">
          <div>
            <div className="flex justify-center items-center">
              <Image
                src="/images/logo.png"
                alt="Daily Healthy Habit Icon"
                width="50"
                height={0}
              />
              <p className="font-semibold text-ds-gray">
                {" "}
                Daily <span className="text-ds-tosca-100">Healthy</span> Habit
              </p>
            </div>
          </div>
          <div>
            <ul className="flex">
              <li className="mx-6">
                <a href="#">
                  Fitur
                </a>
              </li>
              <li className="mx-6">
                <a href="#">
                  Tentang Aplikasi
                </a>
              </li>
              <li className="mx-6">
                <a href="#">
                  Kontak Kami
                </a>
              </li>
              <li className="mx-6">
                <a href="#">
                  Register
                </a>
              </li>
              <li className="mx-6">
              <Link
                href="/login"
                className="bg-ds-blue-100 px-6 rounded-lg py-2 text-white"
              >
                Sign In
              </Link>
              </li>
            </ul>
          </div>
        </header>
        <section className="text-black px-32 flex justify-between">
          <div className="flex justify-center flex-col">
            <p className="text-7xl font-semibold text-ds-gray">DAILY HEALTHY</p>
            <p className="text-7xl font-semibold text-ds-blue-50 mt-2">HABIT APP</p>
            <p className="text-3xl font-semibold text-[#979797] mt-2">Mulai kebiasaan Baik Dengan <br /> Perencanaan Setiap Hari </p>
            <p className="text-sm font-normal text-gray-400 mt-2">Solusi terbaik untuk membantu Anda membentuk dan <br /> menjaga kebiasaan sehat. Kami menyediakan alat yang <br /> Anda perlukan untuk mencapai hasil besar melalui <br /> langkah-langkah kecil.</p>
            <div className="flex my-6">
                <a className="bg-ds-blue-100 flex px-6 py-2 text-white rounded-full font-semibold" href="#">
                  <p className="mx-2">Unduh Sekarang</p>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </a>
                <a className="bg-ds-orange mx-6 flex px-4 py-2 text-white rounded-full font-semibold" href="#">
                <p className="mx-2">Jelajahi Sekarang</p>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>
                </a>
            </div>
          </div>
          <div>
          <style global jsx>{`
              .banner {
                position: relative;
                animation: moveUpDown 3s linear infinite;
              }
              @keyframes moveUpDown {
                0% {
                  top: 0;
                }
  
                50% {
                  top: 30px;
                  /* Atur ketinggian maksimal pergerakan gambar */
                }
  
                100% {
                  top: 0;
                }
              }
          `}</style>
          <Image
            src="/images/banner-landing.png"
            alt="Banner Login"
            width="700"
            height="0"
            className="banner"
          />   
          </div>
        </section>
      </div>
    </>
  );
}
