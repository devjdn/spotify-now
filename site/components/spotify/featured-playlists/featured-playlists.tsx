// In FeaturedPlaylists.tsx
import { fetchFeaturedPlaylists } from "@/api/featured-playlists-call";
import { FeaturedPlaylist } from "@/lib/global";
import { GridToScrollContainer, GridToScrollUl, GridToScrollLi } from "../../grid-to-scroll/grid-to-scroll";
import { ListVideo } from "lucide-react";
import Link from "next/link";


export default async function FeaturedPlaylists() {
    const featuredPlaylists: FeaturedPlaylist[] = await fetchFeaturedPlaylists();

    return (
        <section className="featured-playlists">
            <GridToScrollContainer>
                <GridToScrollUl>
                    {featuredPlaylists.map((playlist, playlistIndex) => (
                        <GridToScrollLi key={playlistIndex}>
                            <img loading="lazy" src={playlist.images[0]?.url} alt={playlist.name} />
                            <div className="playlist-details">
                               <div className="info">
                                    <Link href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                        <strong>{playlist.name}</strong>
                                    </Link>
                                    <p>{playlist.tracks.total} tracks</p>
                               </div>
                               <Link href={`/featured-playlists/${playlist.id}`}>
                                    <ListVideo/>
                               </Link>
                            </div>
                        </GridToScrollLi>
                    ))}
                </GridToScrollUl>
            </GridToScrollContainer>
        </section>
    );
}