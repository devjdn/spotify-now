import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./scss/globals.scss";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const dm = DM_Sans({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "SpotifyNow",
  description: "SpotifyNow is a site that allows users to stay up to date with everything Spotify-release-related. Built in Next.JS, TypeScript, SCSS, it pulls data directly from the Spotify Web API efficiently, and in a readable format. You can see things like: New releases, the live global top 50 songs, Spotify's featured playlists, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpeedInsights/>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
