import React, { useState } from "react";

import InputFormContactUs from "./InputFormContactUs";
import Loading from "@/components/loadingButton";

const FormContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noHP, setNoHP] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form action="">
      <InputFormContactUs
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama"
      />
      <InputFormContactUs
        type="text"
        value={noHP}
        onChange={(e) => setNoHP(e.target.value)}
        placeholder="Nomor Telefon"
      />
      <InputFormContactUs
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Alamat Email"
      />
      <textarea
        placeholder="Pesan"
        rows={7}
        className="resize-none bg-gray-100 focus:outline-none focus:border-ds-blue-100 px-4 text-gray-400 border-gray-300 shadow p-2 py-3 rounded-lg w-full"
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div className="mt-10 flex flex-col">
        {isLoading ? (
          <button className="w-full text-center bg-ds-blue-50 shadow py-1.5 text-white font-semibold rounded-lg text-xl">
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

export default FormContactUs;
