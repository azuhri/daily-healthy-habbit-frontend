import Image from "next/image";

const BlogChild = ({pathImage}:any) => {
  return (
    <div className="text-black mx-4">
      <div className=" bg-ds-white-100 shadow p-2 rounded-lg overflow-hidden relative">
        <Image
          src={pathImage}
          alt="Banner Register"
          width={500}
          height={0}
        />
      </div>
      <div className="p-4">
        <p className="text-xs mx-4  text-gray-500">2 September 2023</p>
        <h2 className="text-xl font-bold text-ds-blue-100">Title</h2>
        <p className="line-clamp-3 text-xs font-light text-gray-500 my-2 ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          libero id maximus fringilla, dui enim cursus urna, non pharetra tellus
          massa ac tellus. Sed gravida, dui id dapibus tristique, mi orci tempus
          sapien, at eleifend justo metus id lacus.
        </p>
        <a href="#" className="text-blue-500 font-normal text-xs">
          Read more
        </a>
      </div>
    </div>
  );
};

export default BlogChild;
