import $ from "jquery";
import { useEffect, useState } from "react";
import Accordion from "./Accordion";

export default function FAQ() {
  return (
    <>
      <div id="FAQSection"></div>
      <section className="py-64 px-10 md:px-32 bg-white">
        <div className="flex justify-center my-4 flex flex-col">
          <p className="text-4xl text-ds-blue-100 text-center font-bold">
            FAQs
          </p>
          <p className="text-xl text-ds-gray text-center mt-6 font-semibold">
            General FAQ
          </p>
        </div>
        <div className="flex flex-col">
          <Accordion
            title="Apa itu daily healthy habit app ?"
            desc="Daily Healthy Habit adalah aplikasi inovatif yang
            dirancang khusus untuk membantu Anda mencapai gaya hidup
            sehat yang lebih baik. Kami adalah teman setia Anda dalam
            perjalanan pencatatan dan monitoring kebiasaan harian Anda.
            Dengan Daily Healthy Habit, Anda dapat dengan mudah melacak,
            mencatat, dan memelihara kebiasaan positif seperti olahraga, pola 
            makan sehat, tidur yang cukup, dan banyak lagi. Kami memberikan Anda alat
            yang Anda butuhkan untuk mencapai tujuan kesehatan dan produktivitas Anda. 
            Bergabunglah dengan komunitas pengguna kami yang penuh semangat dan jadilah
            versi terbaik dari diri Anda dengan Daily Healthy Habit!"
          />
          <Accordion
            title="Apa kelebihan yang ditawarkan daily healthy habit ?"
            desc="Daily healthy habit menawarkan kelebihan untuk pencatatan dan pemantauan kebiasaan (habit trakcing) dengan notifikasi pengigat kegiatan"
          />
        </div>
      </section>
    </>
  );
}
