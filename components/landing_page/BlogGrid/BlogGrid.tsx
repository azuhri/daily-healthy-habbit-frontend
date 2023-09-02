import BlogChild from "./BlogChild";

const BlogGrid = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white pb-32">
      <h1 className="text-4xl font-bold mt-8 mb-16 text-center text-ds-blue-100">
        BLOG
      </h1>
      <div className="w-3/4 h-3/4 grid grid-cols-3 gap-24">
        {BlogChild()}
        {BlogChild()}
        {BlogChild()}
      </div>
    </div>
  );
};

export default BlogGrid;
