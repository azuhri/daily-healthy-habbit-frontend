import ListFeature2 from "./ListFeature2";
import Image from "next/image";

export default function Feature() {
  return (
    <div className="bg-white py-[200px] px-16 md:px-32" id="FeatureSection">
      <p className="text-4xl text-ds-blue-100 text-center font-bold">
        FITUR
      </p>
      <div className="flex md:flex-row flex-col my-20 justify-center items-center">
        <ListFeature2
          title="Monitoring Kebiasaan (Habit Tracking)"
          desc="Anda memiliki kendali penuh atas perubahan positif dalam hidup Anda. kami ada di sini untuk membantu Anda mencapainya."
          >
                <Image alt="Icon Monitoring" src='/icons/monitoring.png' width={100} height={0} />
        </ListFeature2>
        <ListFeature2
          title="Notifikasi Pengingat Kebiasaan"
          desc="Notifikasi pengingat kebiasaan baik untuk Anda dalam mencapai target tanpa takut lupa karena kesibukan Anda"
          >
                <Image alt="Icon Monitoring" src='/icons/alarm.png' width={100} height={0} />
        </ListFeature2>
        <ListFeature2
          title="Buat Target Kebiasaan Baik"
          desc="Tentukan target kebiasaan baik Anda, untuk merubah kebiasaan buruk Anda menjadi lebih baik"
          >
                <Image alt="Icon Monitoring" src='/icons/finish-flag2.png' width={100} height={0} />
        </ListFeature2>
      </div>
    </div>
  );
}
