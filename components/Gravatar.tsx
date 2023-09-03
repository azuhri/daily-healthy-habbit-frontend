import Image from "next/image";

const Gravatar = ({ name }: any) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${name}`
  return <Image width={40} height={0} alt="Gravatar" className="rounded-full border border-gray-400" src={avatarUrl} />;
};

export default Gravatar;
