import Image from "next/image";

const ErrorComponent = (image: string, text: string) => {
  return (
    <div className="bg-white flex flex-col items-center justify-center h-screen">
      <Image src={image} width="450" height="450" alt="Error Banner" />
      <p className="text-gray-400 text-xl">
        {"\n\n"}
        {text}
      </p>
    </div>
  );
};

export default ErrorComponent;
