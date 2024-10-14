import { fetchFeaturedPlaylists } from "@/api/featured-playlists-call";
import { FeaturedPlaylist } from "@/lib/global";
import { GridToScrollContainer, GridToScrollUl, GridToScrollLi } from "../grid-to-scroll/grid-to-scroll";
import { ShelfContainer, ShelfHeader, ShelfScroll, ShelfUl, ShelfLi } from "../shelf/shelf";
import Link from "next/link";
import Image from "next/image";


export default async function FeaturedPlaylists() {
    const featuredPlaylists: FeaturedPlaylist[] = await fetchFeaturedPlaylists();

    return (
        <section className="featured-playlists" id="featured-playlists">
            <ShelfContainer>
                <ShelfHeader shelfTitle="Hot Playlists"/>
                <ShelfScroll>
                <ShelfUl>
                    {featuredPlaylists.map((playlist, playlistIndex) => (
                        <ShelfLi key={playlistIndex} itemArtwork={playlist.images[0]?.url} itemTitle={playlist.name} itemDetails={`${playlist.tracks.total.toString()} tracks`} titleId={`/playlist/${playlist.id}`}/>
                    ))}
                </ShelfUl>
                </ShelfScroll>
            </ShelfContainer>
        </section>
    );
}