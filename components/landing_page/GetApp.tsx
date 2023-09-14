import Image from "next/image";
export default function GetApp() {
  return (
    <>
      <div className="py-32 bg-ds-white-100 md:px-32 text-gray-600" id="DownloadApp">
        <div className="flex w-full flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col w-full justify-center md:justify-start md:w-1/2">
            <p className="text-7xl text-center md:text-left font-semibold" data-aos="zoom-in">
              Download <br /> App
            </p>
            <p className="mt-6 mx-8 md:mx-0 mb-2 text-center md:text-left text-center md:text-left text-sm" data-aos="fade-right">
              Dapatkan Aplikasi Kami Sekarang!. Ubah perjalanan menuju gaya
              hidup sehat dengan satu langkah mudah. Unduh aplikasi Daily
              Healthy Habit sekarang dan mulai pencapaian Anda menuju
              kesejahteraan yang lebih baik.
            </p>
            <a className="flex justify-center md:justify-start" href="https://play.google.com/store/apps/details?id=com.hl1.daily_healthy_habit_mobile&pcampaignid=web_share">
              <Image
                data-aos="zoom-in"
                src="/images/google-play-badge.png"
                alt="Daily Healthy Habit Icon"
                className=""
                width="300"
                height={0}
              />
            </a>
          </div>
          <div
             className="w-full md:w-1/2 flex md:justify-end justify-center text-center md:text-left">
             <Image
              data-aos="zoom-in"
              className="my-10"
              src="/images/ilustrasion-mobile.png"
              alt="Daily Healthy Habit Icon"
              width="1000"
              height={0}
            />
          </div>
        </div>
        <div  id="contacUsSection2"></div>
      </div>
      
    </>
  );
}
