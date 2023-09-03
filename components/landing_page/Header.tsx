import Image from "next/image";
import Link from "next/link";
export default function HeaderLandingPage() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // first prevent the default behavior
    e.preventDefault();
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    window.scrollTo({
      top: elem?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };
  return (
    <>
      <header
        id="navbar"
        className="transition ease-in fixed z-10 top-0 w-full text-black  py-4 flex items-center justify-between px-32"
      >
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
            <li id="featureNav" className="mx-6 transition ease-in-out delay-150">
              <a href="#FeatureSection">Fitur</a>
            </li>
            <li
              id="howToUseNav"
              className="mx-6 transition ease-in-out delay-150"
            >
              <a href="#HowToUseSection">Tentang Aplikasi</a>
            </li>
            <li className="mx-6">
              <Link href="#">Kontak Kami</Link>
            </li>
            <li id="blogNav" className="mx-6 transition ease-in-out delay-150">
              <a href="#BlogSection">Blog</a>
            </li>
            <li className="mx-6">
              <Link href="/register">Register</Link>
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
