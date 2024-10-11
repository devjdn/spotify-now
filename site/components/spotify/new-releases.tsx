import { fetchNewReleases } from "@/api/new-releases-call";
import { SpotifyNewReleases } from "@/lib/global";
import { GridToScrollContainer, GridToScrollUl, GridToScrollLi } from "../grid-to-scroll/grid-to-scroll";
import Link from "next/link";

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
            <GridToScrollContainer>
                {releaseTypes.filter((releaseType) => releaseType.releases.length > 0).map((releaseGroup, releaseIndex) => (
                    <div className="release-type">
                        <h3>{releaseGroup.typeName}</h3>
                        <GridToScrollUl key={releaseIndex}>
                            {releaseGroup.releases.map((items, itemIndex) => (
                                <GridToScrollLi key={itemIndex}>
                                    <img src={items.images[0]?.url} alt={items.name} />
                                    <div className="info">
                                        <Link href={`/album/${items.id}`}>
                                            <strong>{items.name}</strong>
                                        </Link>
                                        <div className="artist-list">
                                            <Link href={items.artists[0].external_urls.spotify}>
                                              <span className="song-text">{items.artists[0].name}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </GridToScrollLi>
                            ))}
                        </GridToScrollUl>
                    </div>
                ))}
            </GridToScrollContainer>
        </section>
    );
}

export default NewReleases;
