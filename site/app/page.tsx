import NewReleases from "@/components/spotify/new-releases";
import Image from "next/image";
import WeekndHero from "@/public/weeknd-hero.webp";
import FeaturedPlaylists from "@/components/spotify/featured-playlists";
import GlobalTop50 from "@/components/spotify/top-50";

export default function Home() {
  return (
    <main className="home-main">
      <section className="intro">
        <h1>Stay up to date with music on Spotify.</h1>
        <h4>No need to dig through playlists. See the hottest new releases on Spotify straight away.</h4>
      </section>
      <NewReleases/>
      <GlobalTop50/>
      <FeaturedPlaylists/>
    </main>
  );
}
