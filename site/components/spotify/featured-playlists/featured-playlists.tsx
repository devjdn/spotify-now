// In FeaturedPlaylists.tsx
import { fetchFeaturedPlaylists } from "@/api/spotify";
import { FeaturedPlaylist } from "@/lib/global";
import { GridToScrollContainer, GridToScrollUl, GridToScrollLi } from "../../grid-to-scroll/grid-to-scroll";
import PlaylistTracks from "./featured-playlist-tracks";
import PlaylistPopupBtn from "./featured-playlist-popup-btn";

export default async function FeaturedPlaylists() {
    const featuredPlaylists: FeaturedPlaylist[] = await fetchFeaturedPlaylists();

    return (
        <section className="featured-playlists">
            <h2>Featured playlists</h2>
            <GridToScrollContainer>
                <GridToScrollUl>
                    {featuredPlaylists.map((playlist, playlistIndex) => (
                        <GridToScrollLi key={playlistIndex}>
                            <img loading="lazy" src={playlist.images[0]?.url} alt={playlist.name} />
                            <div className="info">
                                <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                    <strong>{playlist.name}</strong>
                                </a>
                                <p>{playlist.tracks.total} tracks</p>
                            </div>
                        </GridToScrollLi>
                    ))}
                </GridToScrollUl>
            </GridToScrollContainer>
        </section>
    );
}