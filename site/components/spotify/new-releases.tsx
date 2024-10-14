import { fetchNewReleases } from "@/api/new-releases-call";
import { SpotifyNewReleases } from "@/lib/global";
import { ShelfContainer, ShelfHeader, ShelfScroll, ShelfUl, ShelfLi } from "../shelf/shelf";
import { ScrollBtns } from "../buttons/scroll-btns";

const NewReleases = async () => {
    const newReleases: SpotifyNewReleases = await fetchNewReleases();
    const releaseTypes = [
        {
            type: 'single',
            typeName: 'Singles',
            releases: [] as typeof newReleases.items
        },
        {
            type: 'album',
            typeName: 'Albums',
            releases: [] as typeof newReleases.items
        },
        {
            type: 'compilation',
            typeName: 'Compilations',
            releases: [] as typeof newReleases.items
        },
    ];

    newReleases.items.forEach((album) => {
        if (album.album_type === 'single') {
            releaseTypes[0].releases.push(album);
        } else if (album.album_type === 'album') {
            releaseTypes[1].releases.push(album);
        } else if (album.album_type === 'compilation') {
            releaseTypes[2].releases.push(album);
        }
    })


    return(
        <section className="new-releases" id="new-drops">
            <ShelfContainer>
                <ShelfHeader shelfTitle="New Releases">
                    <ScrollBtns scrollTargetSelector="ul.shelf-ul"/>
                </ShelfHeader>
                <ShelfScroll>
                <ShelfUl>
                    {newReleases.items.map((items, itemIndex) => (
                        <ShelfLi key={itemIndex} itemArtwork={items.images[0]?.url} itemTitle={items.name} itemDetails={items.artists[0].name} titleId={`/album/${items.id}`} detailsId={`/artist/${items.artists[0].id}`}/>
                    ))}
                </ShelfUl>
                </ShelfScroll>
            </ShelfContainer>
        </section>
    );
}

export default NewReleases;
