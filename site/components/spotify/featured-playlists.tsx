import { fetchFeaturedPlaylists } from "@/api/spotify";
import { Playlist } from "@/lib/global";
import { ScrollContainer, ScrollList, ScrollListItem } from "../scroll/scroll-container";

export default async function FeaturedPlaylists() {
    const featuredPlaylists: Playlist[] = await fetchFeaturedPlaylists();

    return(
        <section className="featured-playlists">
            <h2>Featured playlists</h2>
            <ScrollContainer>
                <ScrollList>
                    {featuredPlaylists.map((playlist, playlistIndex) => (
                        
                            <ScrollListItem key={playlistIndex}>
                                <img src={playlist.images[0]?.url} alt={playlist.name} />
                                <div className="info">
                                    <a href={playlist.external_urls.spotify} target="_blank">
                                        <span>{playlist.name}</span>
                                    </a>
                                    <p className="capitalize">{playlist.collaborative ? 'Collaborative' : 'Non-collaborative'}</p>
                                </div>
                            </ScrollListItem>
                    ))}
                </ScrollList>
            </ScrollContainer>
        </section>
    );
}
