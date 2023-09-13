import Image from "next/image";
import Link from "next/link";
interface ContentError {
  image: string;
  text: string;
}

const ErrorComponent = ({image, text}: ContentError) => {
  return (
    <div className="bg-white flex flex-col items-center justify-center h-screen">
      <Image src={image} width="450" height="450" alt="Error Banner" />
      <p className="text-gray-400 text-xl my-4 font-semibold">
        {"\n\n"}
        {text}
      </p>
      <Link className="my-4 border-ds-tosca-200 bg-ds-tosca-100 shadow-xl rounded-lg text-sm text-white p-4" href="/" >
         Kembali Halaman Utama
      </Link>
    </div>
  );
};

export default ErrorComponent;
