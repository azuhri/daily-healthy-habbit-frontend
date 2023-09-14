import Image from "next/image";

export default function LeftAppRightText({
  imagePath,
  alt,
  title,
  desc,
}: {
  imagePath: string;
  alt: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="my-5">
      <div className="flex md:flex-row flex-col">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center relative">
          <Image
            data-aos="zoom-in"
            src={imagePath}
            alt={alt}
            width="350"
            height={0}
          />
        </div>
        <div className="w-full md:w-1/2 flex justify-center flex-col">
          <div className="flex mx-8 text-justify flex-col">
            <p
              className="font-semibold text-gray-500 text-3xl text-center"
              data-aos="zoom-in"
            >
              {title}
            </p>
            <p className="text-black text-lg my-2" data-aos="zoom-in">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
