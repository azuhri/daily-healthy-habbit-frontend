import Circle from "../components/Circle";
import BlogChild from "./BlogChild";

const Blog = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white py-32 md:px-32" id="BlogSection">
      <h1 className="text-4xl font-bold mt-8 mb-16 text-center text-ds-blue-100">
        BLOG
      </h1>
      <div className="flex md:flex-row flex-col relative">
        <BlogChild pathImage="/images/ilustrasi-register.png" />
        <BlogChild pathImage="/images/ilustration-blog1.png" />
        <BlogChild pathImage="/images/ilustrasi-login.png" />
        {/* <Circle css="top-[-250px] right-[-320px] bg-ds-blue-100"/> */}
      </div>
    </div>
  );
};

export default Blog;
