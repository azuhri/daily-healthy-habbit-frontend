import Circle from "../components/Circle";
import LeftAppRightText from "./LeftAppRightText";
import RightAppLeftText from "./RightAppLeftText";

export default function Docs() {
  return (
    <>
      <div className="flex pb-[300px] md:px-32  flex-col bg-white relative">
        <p className="text-4xl text-ds-blue-100 text-center font-bold">
          HOW TO USE APP ?
        </p>
        <LeftAppRightText
          image="/images/fitur_home.svg"
          imageAlt="Fitur Home"
          title="FITUR HOME"
          description="Pusat semua kebiasaanmu ada di sini. 
          Lacak, kelola, dan catat setiap langkah menuju perubahan yang lebih baik. 
          Saksikan perkembanganmu dalam riwayat kebiasaan yang informatif. 
          Saatnya untuk mencatat, refleksi, dan mengembangkan diri!"
        />
        <RightAppLeftText
          image="/images/fitur_auth.svg"
          imageAlt="Fitur Auth"
          title="FITUR AKUN"
          description="Buat akun dan login untuk mulai bersama kami.
          Dengan akun yang sama, kamu akan lebih terhubung di berbagai perangkat.
          Lupakan kekhawatiran kehilangan data,
          akses kebiasaanmu kapanpun dan dimanapun!"
        />
        <LeftAppRightText
          image="/images/fitur_create.svg"
          imageAlt="Fitur Create"
          title="FITUR BUAT KEBIASAAN"
          description="Baik belajar, olahraga, atau apapun itu,
          daftarkan kebiasaan yang ingin anda lacak.
          Kamu dapat atur kapan kami akan mengingatkanmu pada waktu yang tepat.
          Jangan lupa sesuaikan warna untuk mempermudah mengenali kebiasaanmu.
          Mulai membentuk kebiasaan yang baik, dan mulai sekarang!"
        />
      </div>
    </>
  );
}
