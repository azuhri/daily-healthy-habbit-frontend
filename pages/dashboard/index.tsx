import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetServerSideProps,
} from "next";
import $ from "jquery";
import { getServerSideProps } from "@/lib/getSession";

export {getServerSideProps}
export default function DashboardPage() {
  return <div className="min-h-[100vh] bg-white text-red-500">ini dashboard</div>;
}
