import { getSpotifyAccessToken } from "@/api/access-token";
import FeaturedPlaylists from "@/components/spotify/featured-playlists";
import NewReleases from "@/components/spotify/new-releases";

export default async function Home() {
  const accessToken = await getSpotifyAccessToken();

  return (
    <>
    <section className="intro">
      <h1>Home</h1>
    </section>
    <NewReleases accessToken={accessToken}/>
    <FeaturedPlaylists/>
    </>
  );
}
