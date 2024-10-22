import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./scss/globals.scss";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Sidebar from "@/components/sidebar/sidebar";
import { Suspense } from "react";
import Loading from "@/components/loading/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpotifyNow",
  description: "SpotifyNow is a site that allows users to stay up to date with everything Spotify-release-related. Built in Next.JS, TypeScript, SCSS, it pulls data directly from the Spotify Web API efficiently, and in a readable format. You can see things like: New releases, the live global top 50 songs, Spotify's featured playlists, and more!",
};

export default function RootLayout({children}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpeedInsights/>
        <Sidebar/>
        <main className="content-window">
          <Suspense fallback={<Loading/>}>
            {children}
          </Suspense>
        </main>
      </body>
    </html>
  );
}
