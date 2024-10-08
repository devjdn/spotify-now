import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./scss/globals.scss";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Sidebar from "@/app/components/sidebar";
import { getSpotifyAccessToken } from "@/api/access-token";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpotifyNow",
  description: "SpotifyNow is a site that allows users to stay up to date with everything Spotify-release-related. Built in Next.JS, TypeScript, SCSS, it pulls data directly from the Spotify Web API efficiently, and in a readable format. You can see things like: New releases, the live global top 50 songs, Spotify's featured playlists, and more!",
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  let accessToken = await getSpotifyAccessToken();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpeedInsights/>
        <Sidebar accessToken={accessToken}/>
        <main className="content-window">
          {children}
        </main>
      </body>
    </html>
  );
}
