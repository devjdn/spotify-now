import type { Metadata } from "next";
import { Inter_Tight, DM_Sans, Manrope } from "next/font/google";
import "./globals.scss";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const interTight = Inter_Tight({ subsets: ["latin"] });
const dm = DM_Sans({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SpotifyNow",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dm.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
