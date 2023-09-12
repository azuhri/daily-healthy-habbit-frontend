import Image from "next/image";

import FormContactUs from "./FormContactUs";

const ContactUs = () => {
  return (
    <>
     <div id="contacUsSection"></div>
    <div className="py-32 bg-white flex flex-col justify-center items-center">
      <p className="pt-8 text-4xl font-bold text-ds-blue-100 my-10" data-aos="zoom-in">
        KONTAK KAMI
      </p>
      <div className="h-[90%] w-[90%] py-10 bg-white rounded-xl shadow-allSides" data-aos="zoom-in">
        <div className="flex flex-col-reverse md:flex-row  w-full px-8 pb-8">
          <div className="w-full md:w-1/2 bg-white pb-4">
            <h1 className="text-2xl text-center md:text-left font-bold text-ds-blue-100" >
              KRITIK ATAU SARAN
            </h1>
            <p className="text-black text-center md:text-left mb-10 font-medium" >
              Saran Anda Sangat Berharga, Untuk Mengembangkan Product Kami
            </p>
            <FormContactUs />
          </div>
          <div className="w-full md:w-1/2 bg-white my-4 flex justify-center items-center">
            <Image
              data-aos="zoom-in"
              className="w-3/4"
              src="/images/ilustrasi-contact-us.png"
              alt="Banner Register"
              width="600"
              height="0"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
