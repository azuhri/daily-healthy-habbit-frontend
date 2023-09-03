import Circle from "../components/Circle";
import BlogChild from "./BlogChild";

const Blog = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white py-32 relative" id="BlogSection">
      <h1 className="text-4xl font-bold mt-8 mb-16 text-center text-ds-blue-100">
        BLOG
      </h1>
      <div className="w-3/4 h-3/4 grid grid-cols-3 gap-24">
        <BlogChild pathImage="/images/ilustrasi-register.png" />
        <BlogChild pathImage="/images/ilustration-blog1.png" />
        <BlogChild pathImage="/images/ilustrasi-login.png" />
        <Circle css="top-0 right-[-120px] bg-ds-blue-100"/>
      </div>
    </div>
  );
};

export default Blog;
