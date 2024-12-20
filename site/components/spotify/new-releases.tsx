import { fetchNewReleases } from "@/api/home-api-calls";
import { SpotifyNewReleases } from "@/lib/global";
import { ShelfContainer, ShelfHeader, ShelfScroll, ShelfUl, ShelfLi } from "../shelf/shelf";
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollBtns } from '../buttons/scroll-btns';

const NewReleases = async () => {
    const newReleases: SpotifyNewReleases = await fetchNewReleases();
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
