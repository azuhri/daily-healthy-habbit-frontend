import Image from "next/image";

const BlogChild = () => {
  return (
    <div className="text-black">
      <div className="h-1/2 bg-gray-300 rounded-lg overflow-hidden relative">
        <Image
          src="/images/ilustrasi-register.png"
          alt="Banner Register"
          fill={true}
          className="banner"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500">2 September 2023</p>
        <h2 className="text-xl font-bold">Title</h2>
        <p className="line-clamp-3 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          libero id maximus fringilla, dui enim cursus urna, non pharetra tellus
          massa ac tellus. Sed gravida, dui id dapibus tristique, mi orci tempus
          sapien, at eleifend justo metus id lacus.
        </p>
        <a href="#" className="text-blue-500">
          Read more
        </a>
      </div>
    </div>
  );
};

export default BlogChild;
