import { fetchFeaturedPlaylists } from "@/api/spotify";
import { FeaturedPlaylist } from "@/lib/global";
import { GridToScrollContainer, GridToScrollUl, GridToScrollLi } from "../../grid-to-scroll/grid-to-scroll";

export default async function FeaturedPlaylists() {
    const featuredPlaylists: FeaturedPlaylist[] = await fetchFeaturedPlaylists();

    return(
        <section className="featured-playlists">
            <h2>Featured playlists</h2>
            <GridToScrollContainer>
                <GridToScrollUl>
                    {featuredPlaylists.map((playlist, playlistIndex) => (
                        
                            <GridToScrollLi key={playlistIndex}>
                                <img loading="lazy" src={playlist.images[0]?.url} alt={playlist.name} />
                                <div className="info">
                                    <a href={playlist.external_urls.spotify} target="_blank">
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