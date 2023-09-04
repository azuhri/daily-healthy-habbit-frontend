import Image from "next/image";
import Circle from "./components/Circle";
import Link from "next/link";
export default function Hero() {
  return (
    <>
      <div className="bg-[url('/images/bg-hero.jpeg')] bg-left">
        <section className="min-h-[100vh] text-black px-32 flex justify-between">
          <div className="flex justify-center flex-col w-1/2">
            <p className="text-7xl font-semibold text-gray-600">
              DAILY HEALTHY
            </p>
            <p className="text-7xl font-semibold text-ds-blue-50 mt-2">
              HABIT APP
            </p>
            <p className="text-2xl font-semibold text-[#979797] mt-2">
              Mulai kebiasaan Baik Dengan Perencanaan Setiap Hari{" "}
            </p>
            <p className="text-sm font-normal text-gray-400 mt-2">
              Solusi terbaik untuk membantu Anda membentuk dan menjaga kebiasaan
              sehat. Kami menyediakan alat yang Anda perlukan untuk mencapai
              hasil besar melalui langkah-langkah kecil.
            </p>
            <div className="flex my-6">
              <Link
                className="bg-ds-blue-100 flex px-6 py-3 text-white rounded-full font-semibold"
                href="#DownloadApp"
              >
                <p className="mx-2">Unduh Sekarang</p>
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="css-i6dzq1"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </Link>
              <Link
                className="bg-ds-orange mx-6 flex px-6 py-3 text-white rounded-full font-semibold"
                href="#FeatureSection"
              >
                <p className="mx-2">Jelajahi Sekarang</p>
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
                  <polyline points="7 13 12 18 17 13"></polyline>
                  <polyline points="7 6 12 11 17 6"></polyline>
                </svg>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
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
        <Circle css="left-[-120px] bg-ds-blue-100"/>
      </div>
    </>
  );
}
