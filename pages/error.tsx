import ErrorComponent from "@/components/ErrorComponent";

const ErrorPage = () => {
  return ErrorComponent(
    "/images/ilustrasi-error.png",
    "Ups, halaman tidak ditemukan!"
  );
};

export default ErrorPage;
