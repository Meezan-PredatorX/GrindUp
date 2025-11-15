import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/lib/context/UserContext";
import {SpeedInsights} from "@vercel/speed-insights"; 
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "GrindUp",
  description: "Revolutionize the hiring process with GrindUp. Our platform streamlines recruitment, making it efficient and effective for both employers and placement giving colleges.",
};

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <UserProvider>
          {children}
          <SpeedInsights/>
        </UserProvider>
      </body>
    </html>
  );
}
