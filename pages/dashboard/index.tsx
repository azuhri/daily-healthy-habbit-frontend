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

const DashboardPage = ({ user }: { user: any;}) => {
  const router = useRouter();
  const modal = useSelector((state: any) => state.modal);

  const handleLogout = async () => {
    try {
      const url = "/api/logout";
      await axios.post(url);
      router.push("/login");
    } catch (error) {
      console.error("Terjadi kesalahan saat logout:", error);
    }
  };

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
      <LayoutDashboard user={user} />
    </>
  );
};

export { getServerSideProps };
export default DashboardPage;
