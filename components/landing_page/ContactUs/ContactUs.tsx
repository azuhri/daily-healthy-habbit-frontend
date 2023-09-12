import Image from "next/image";

import FormContactUs from "./FormContactUs";

const ContactUs = () => {
  return (
    <div className="h-screen bg-white flex justify-center items-center">
      <div className="h-[95%] w-[95%] bg-white rounded-lg shadow-allSides">
        <div className="text-center h-[15%]">
          <p className="pt-8 text-4xl font-bold text-ds-blue-100">
            KONTAK KAMI
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 h-[80%] w-full px-8 pb-8">
          <div className="bg-white pb-4">
            <h1 className="text-2xl font-bold text-ds-blue-100">
              KRITIK ATAU SARAN
            </h1>
            <p className="text-black font-medium">
              Komentar anda membangun kami!
            </p>
            <FormContactUs />
          </div>
          <div className="bg-white flex justify-center w-full h-full">
            <Image
              src="/images/ilustrasi-contact-us.png"
              alt="Banner Contact Us"
              width="450"
              height="400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
