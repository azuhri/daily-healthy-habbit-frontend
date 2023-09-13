import ErrorComponent from "@/components/ErrorComponent";

export default function Custom404() {
  return (
    <ErrorComponent
      image="/images/404.png"
      text="Sepertinya Anda salah link :')"
    />
  );
}
