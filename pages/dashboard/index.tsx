import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetServerSideProps,
} from "next";
import $ from "jquery";
import { getServerSideProps } from "@/lib/getSession";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

import LayoutDashboard from "@/components/dashboard/Layout";
import ConfirmationModal from "@/components/dashboard/ConfirmationModal";
import { useAppDispatch } from "@/redux/store";
import { closeSidebar } from "@/redux/features/habitSidebar/habitSidebarSlice";
import { setHabits } from "@/redux/features/habits/habitsSlice";
import DashboardModal from "@/components/dashboard/DashboardModal";
import { useEffect } from "react";
import { setGuest } from "@/redux/features/guest/guestSlice";
import { requestPermission } from "../../utils/firebase";

const DashboardPage = ({ user }: { user: any }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const modal = useSelector((state: any) => state.modal);
  const { date } = useSelector((state: any) => state.time);

  // Buat delete
  const API =
    process.env.API || "https://staging-api-health2023.agileteknik.com";
  const access_token = `Bearer ${user.token}`;
  const config = {
    headers: {
      Authorization: `${access_token}`,
    },
  };
  const modalId = modal.id ? modal.id : "";
  const deleteURL = `${API}/api/v2/habbit/${modalId}`;
  const getUrl = `${API}/api/v2/user?date=${date}`;

  const handleLogout = async () => {
    try {
      const url = "/api/logout";
      await axios.post(url);
      dispatch(setGuest(false));
      router.push("/login");
    } catch (error) {
      console.error("Terjadi kesalahan saat logout:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const url = deleteURL;
      const url2 = getUrl;
      console.log(url2);

      const response = await axios.delete(url, config);
      if (response.status == 200) {
        dispatch(closeSidebar());
        const response4 = await axios.get(url2, config);

        if (response4.status === 200) {
          dispatch(
            setHabits(response4.data.data.sort((a: any, b: any) => b.id - a.id))
          );
        } else {
          throw new Error(response4.statusText);
        }
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus habit:", error);
    }
  };

  useEffect(() => {
    async function setToken() {
      try {
        const deviceToken = await requestPermission();
      } catch (error) {
        console.error("Error setting token:", error);
      }
    }

    setToken();

    if (user.name == "Guest") {
      dispatch(setGuest(true));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {modal.isOpen && modal.type == "logout" && (
        <ConfirmationModal
          title="Apakah Anda yakin ingin keluar?"
          imagePath="/images/konfirmasi-logout.svg"
          onAction={handleLogout}
        />
      )}
      {modal.isOpen && modal.type == "delete" && (
        <ConfirmationModal
          title="Apakah Anda yakin ingin menghapus?"
          imagePath="/images/konfirmasi-hapus.svg"
          onAction={handleDelete}
        />
      )}
      {modal.isOpen &&
        (modal.type == "progress" ||
          modal.type == "profile" ||
          modal.type == "registerGuest") && <DashboardModal user={user} />}
      <LayoutDashboard user={user} />
    </>
  );
};

export { getServerSideProps };
export default DashboardPage;
