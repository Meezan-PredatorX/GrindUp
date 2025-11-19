/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Dashboard | GrindUp",
};

export default async function DashboardLayout({children}:{children: React.ReactNode;}) {

  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();

  if (!user) return redirect('/login');

  return (
    <div className={`w-full min-h-screen flex overflow-hidden ${poppins.variable}`}>
      <Sidebar
        user={{
          ...user,
          email: user.email ?? "",
          user_metadata: {
            ...(user.user_metadata as Record<string, any>),
            name: (user.user_metadata as Record<string, any>)?.name ?? "",
            userType: (user.user_metadata as Record<string, any>)?.userType ?? "",
            isProfileCompleted: (user.user_metadata as Record<string, any>)?.isProfileCompleted ?? "false",
          },
        }}
      />
      <main className="p-6 flex-1 overflow-y-auto md:ml-60 ">{children}</main>
    </div>
  );
}
