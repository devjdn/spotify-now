import { fetchNewReleases } from "@/api/new-releases-call";
import { Album } from "@/lib/global";
import { GridToScrollContainer, GridToScrollUl, GridToScrollLi } from "../grid-to-scroll/grid-to-scroll";
import Link from "next/link";

const NewReleases = async () => {
    const newReleases: Album[] = await fetchNewReleases();


    return(
        <section className="new-releases" id="new-drops">
            <GridToScrollContainer>
                <GridToScrollUl>
                    {newReleases.map((album, albumIndex) => (
                        <GridToScrollLi key={albumIndex}>
                            <img src={album.images[0]?.url} alt={album.name} />
                            <div className="info">
                                <Link href={`/album/${album.id}`}>
                                    <strong>{album.name}</strong>
                                </Link>
                                <div className="artist-list">
                                    <Link href={album.artists[0].external_urls.spotify}>
                                      <span className="song-text">{album.artists[0].name}</span>
                                    </Link>
                                </div>
                            </div>
                        </GridToScrollLi>
                    ))}
                </GridToScrollUl>
            </GridToScrollContainer>
        </section>
    );
}

export default NewReleases;
