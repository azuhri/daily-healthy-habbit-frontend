import Image from "next/image";
export default function GetApp() {
  return (
    <>
      <div className="py-32 bg-ds-white-100 px-32 text-gray-600" id="DownloadApp">
        <div className="flex justify-between items-center">
          <div className="flex flex-col w-1/2">
            <p className="text-7xl font-semibold">
              Download <br /> App
            </p>
            <p className="mt-6 mb-2 text-sm">
              Dapatkan Aplikasi Kami Sekarang!. Ubah perjalanan menuju gaya
              hidup sehat dengan satu langkah mudah. Unduh aplikasi Daily
              Healthy Habit sekarang dan mulai pencapaian Anda menuju
              kesejahteraan yang lebih baik.
            </p>
            <a href="https://play.google.com/store/apps/details?id=com.hl1.daily_healthy_habit_mobile&pcampaignid=web_share">
              <Image
                src="/images/google-play-badge.png"
                alt="Daily Healthy Habit Icon"
                className=""
                width="300"
                height={0}
              />
            </a>
          </div>
          <div className="w-1/2 flex justify-center">
            <Image
              src="/images/ilustrasi-mobile1.png"
              alt="Daily Healthy Habit Icon"
              width="400"
              height={400}
            />
          </div>
        </div>
      </div>
    </>
  );
}
