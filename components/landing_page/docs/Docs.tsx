import Circle from "../components/Circle";
import LeftAppRightText from "./LeftAppRightText";
import RightAppLeftText from "./RightAppLeftText";

export default function Docs() {
  return (
    <>
      <div className="flex pb-[300px] md:px-32  flex-col bg-white relative">
        <p className="text-4xl text-ds-blue-100 text-center font-bold">
          HOW TO USE APP ?
        </p>
        <LeftAppRightText
          imagePath="/images/fitur_home.svg"
          alt="Fitur Home"
          title="Fitur Home"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam"
        />
        <RightAppLeftText
          imagePath="/images/fitur_auth.svg"
          alt="Fitur Autentikasi"
          title="Fitur Autentikasi"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam"
        />
        <LeftAppRightText
          imagePath="/images/fitur_create.svg"
          alt="Fitur Create"
          title="Fitur Create"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam"
        />
      </div>
    </>
  );
}
