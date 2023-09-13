import React, { useState } from "react";
import axios from "axios";

import InputFormContactUs from "./InputFormContactUs";
import Loading from "@/components/loadingButton";
import { log } from "console";

export default function FormContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noHP, setNoHP] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitContactUs = async (e:any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = 'https://docs.google.com/forms/d/e/1b670P2BUM46PGYyB2VsssUfskj7ra1lzE8th5M_wyn4/formResponse';
    console.log(e.target);
    

    try {
      setIsLoading(true);
      const response = await axios.post(url, formData);
      if (response.status === 200) {
        alert('Data berhasil disubmit ke Google Form.');
        e.target.reset();
      } else {
        alert('Terjadi kesalahan saat mengirim data.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmitContactUs} action="">
      <InputFormContactUs
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama"
        name="entry.175398728"
      />
      <InputFormContactUs
        type="text"
        value={noHP}
        onChange={(e) => setNoHP(e.target.value)}
        placeholder="Nomor WA"
        name="entry.2095701307"
      />
      <InputFormContactUs
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Alamat Email"
        name="entry.438004252"
      />
      <textarea
        placeholder="Pesan Masukan (kritik dan saran)"
        rows={7}
        className="resize-none bg-gray-100 focus:outline-none focus:border-ds-blue-100 px-4 text-gray-600 border-gray-300 shadow p-2 py-3 rounded-lg w-full"
        onChange={(e) => setMessage(e.target.value)}
        name="entry.1585446307"
      >{message}</textarea>
      <div className="mt-10 flex flex-col">
        {isLoading ? (
          <button className="w-full text-center bg-ds-blue-50 shadow py-1 text-white font-semibold rounded-lg text-xl">
            <Loading />
          </button>
        ) : (
          <button className="w-full text-center bg-ds-blue-50 shadow py-4 text-white font-semibold rounded-lg text-xl">
            Kirim pesan
          </button>
        )}
      </div>
    </form>
  );
};
