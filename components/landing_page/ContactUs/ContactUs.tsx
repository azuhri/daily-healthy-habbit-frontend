import Image from "next/image";
import axios from "axios";
import FormContactUs from "./FormContactUs";
import InputFormContactUs from "./InputFormContactUs";
import Loading from "@/components/loadingButton";
import { useState, useCallback} from "react";
import { log } from "console";
import ModalDialog from "@/components/ModalDialog";
import { useRouter } from "next/router";

const ContactUs = () => {
  const router = useRouter();
  const [trySend, setTrySend] = useState(0);
  const [hideModal, setHideModal] = useState(true);
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [noHP, setNoHP] = useState("");
  const [errorNoHP, setErrorNoHP] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatorEmail = (email:string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let status = regex.test(email);
    return !status;
  }

  const handleUseCallback = useCallback(() => {
    setHideModal(false);
  }, [hideModal])

  const handleSubmitContactUs = async (e: any) => {
    e.preventDefault();
  
    const formData: any = {
      "entry.175398728": name, 
      "entry.2095701307": noHP, 
      "entry.438004252": email, 
      "entry.1585446307": message, 
    };
    const appendedFormData = newFormData({ ...formData });
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/1b670P2BUM46PGYyB2VsssUfskj7ra1lzE8th5M_wyn4/formResponse"; 
    if(!email) {
      setErrorEmail('Data email harus dimasukan!');
    } else if(validatorEmail(email) && email) {
      setErrorEmail('Email tidak valid, tolong cek kembali ya!');
    } else {
      setErrorEmail("");
    }
    
    if(!noHP) {
      setErrorNoHP('Nomor WA harus dimasukan!');
    } else {
      setErrorNoHP("");
    }

    if(!name) {
      setErrorName("Nama harus dimasukan!")
    } else {
      setErrorName("");
    }

    if(!message) {
      setErrorMessage("Data pesan masukan harus diisi!")
    } else {
      setErrorMessage("");
    }

    if(trySend > 3) {
      alert("Maaf Anda hanya bisa mengirim form masukan sebanyak 3 kali!");
      return
    }

    if(name && email && noHP && message) {
      try {
        setIsLoading(true);
        const response = await fetch(GOOGLE_FORM_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: appendedFormData,
        });
        setName("");
        setNoHP("");
        setMessage("");
        setEmail("");
        setErrorName("");
        setErrorNoHP("");
        setErrorMessage("");
        setErrorEmail("");
        
        handleUseCallback();
        setTimeout(() => {
          router.reload();
        }, 3500);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const newFormData = (inputs:any) => {
    const formData = new FormData();
    const newArr = Object.entries(inputs);
    newArr.map((item: any) => {
      return formData.append(`${item[0]}`, item[1]);
    });
    return formData;
  };

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
      <div id="FAQSection2"></div>
    </div>
    </>
  );
};

export default ContactUs;
