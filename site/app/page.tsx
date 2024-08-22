import NewReleases from "@/components/spotify/new-releases";
import Image from "next/image";
import WeekndHero from "@/public/weeknd-hero.webp";
import FeaturedPlaylists from "@/components/spotify/featured-playlists";
import GlobalTop50 from "@/components/spotify/top-50";

export default function Home() {
  return (
    <main className="home-main">
      <GlobalTop50/>
      <NewReleases/>
      <FeaturedPlaylists/>
    </main>
  );
}
