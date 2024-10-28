import { getCachedAccessToken, getSpotifyAccessToken } from "@/api/access-token";
import FeaturedPlaylists from "@/components/spotify/featured-playlists";
import NewReleases from "@/components/spotify/new-releases";

export default async function Home() {

  return (
      <>
        <section className="intro">
          <h1>Home</h1>
        </section>
        <NewReleases/>
        <FeaturedPlaylists/>
      </>
  );
}
