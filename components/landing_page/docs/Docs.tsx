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
          imagePath="/images/fitur_home.svg"
          alt="Fitur Home"
          title="FITUR HOME"
          desc="Pusat kebiasaanmu,
          lihat dan kelola kebiasaanmu dengan mudah.
          Catat kesuksesanmu, baik sedang dilakukan, gagal, atau selesai.
          Akses riwayat kebiasaan dan lihat perkembanganmu.
          Lacak, refleksi, dan tingkatkan kebiasaanmu!"
        />
        <RightAppLeftText
          imagePath="/images/fitur_auth.svg"
          alt="Fitur Autentikasi"
          title="FITUR AUTENTIKASI"
          desc="Buat akun dan login untuk menggunakan aplikasi. 
          Dengan akun yang sama, kamu dapat menggunakan aplikasi di perangkat lain. 
          Tidak lagi khawatir kehilangan datamu, 
          Kamu dapat mengakses kebiasaanmu dimanapun dan kapanpun!"
        />
        <LeftAppRightText
          imagePath="/images/fitur_create.svg"
          alt="Fitur Create"
          title="FITUR CREATE"
          desc="Baik belajar, olahraga, atau apapun itu,
          daftarkan kebiasaan yang ingin anda lacak.
          Atur reminder, akan kami ingatkan agar kamu dapat mempertahankan kebiasaanmu.
          Dan warna untuk menciptakan lingkungan aplikasi yang tepat untukmu.
          Mulai membentuk kebiasaan baik dari sekarang!"
        />
      </div>
    </>
  );
}
