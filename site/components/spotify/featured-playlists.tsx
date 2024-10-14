import { fetchFeaturedPlaylists } from "@/api/featured-playlists-call";
import { FeaturedPlaylist } from "@/lib/global";
import { ShelfContainer, ShelfHeader, ShelfScroll, ShelfUl, ShelfLi } from "../shelf/shelf";
import { ScrollBtns } from "../buttons/scroll-btns";


export default async function FeaturedPlaylists() {
    const featuredPlaylists: FeaturedPlaylist[] = await fetchFeaturedPlaylists();

    return (
        <section className="featured-playlists" id="featured-playlists">
            <ShelfContainer>
                <ShelfHeader shelfTitle="Hot Playlists">
                    <ScrollBtns scrollTargetSelector="ul.shelf-ul"/>
                </ShelfHeader>
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