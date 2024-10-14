import FeaturedPlaylists from "@/components/spotify/featured-playlists";
import NewReleases from "@/components/spotify/new-releases";

export default function Home() {

  return (
    <>
    <section className="intro">
      <h1>SpotifyNow // Home</h1>
    </section>
    <NewReleases/>
    <FeaturedPlaylists/>
    </>
  );
}
