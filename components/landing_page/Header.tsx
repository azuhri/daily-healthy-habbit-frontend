import Image from "next/image";
import Link from "next/link";
export default function HeaderLandingPage() {
  return (
    <>
      <header className="fixed z-10 top-0 w-full text-black bg-white shadow py-4 flex items-center justify-between px-32">
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
              <a href="#">Fitur</a>
            </li>
            <li className="mx-6">
              <a href="#">Tentang Aplikasi</a>
            </li>
            <li className="mx-6">
              <a href="#">Kontak Kami</a>
            </li>
            <li className="mx-6">
              <a href="#">Register</a>
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
    </>
  );
}
