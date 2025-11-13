import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import React from "react"; // 👈 Needed for JSX types in TS

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Dashboard | GrindUp",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`w-full min-h-screen flex overflow-hidden ${poppins.variable}`}>
      <Sidebar />
      <main className="p-6 flex-1 overflow-y-auto md:ml-60 ">{children}</main>
    </div>
  );
}
