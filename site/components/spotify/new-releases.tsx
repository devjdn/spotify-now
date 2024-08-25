import { fetchNewReleases } from "@/api/spotify";
import { Album } from "@/lib/global";
import { GridToScrollContainer, GridToScrollUl, GridToScrollLi } from "../grid-to-scroll/grid-to-scroll";

const NewReleases = async () => {
    const newReleases: Album[] = await fetchNewReleases();


    return(
        <section className="new-releases">
            <h2>New drops</h2>
            <GridToScrollContainer>
                <GridToScrollUl>
                    {newReleases.map((album, albumIndex) => (
                        <GridToScrollLi key={albumIndex}>
                            <img src={album.images[0]?.url} alt={album.name} />
                            <div className="info">
                                <a href={album.external_urls.spotify}>
                                    <strong className="name">{album.name}</strong>
                                </a>
                                <div className="artist-list">
                                    {album.artists.map((artist, index) => (
                                      <a key={index} href={artist.external_urls.spotify}>
                                        <strong className="name">{artist.name}</strong>
                                      </a>
                                    ))}
                                </div>
                                <p className="capitalize">{album.album_type}</p>
                            </div>
                        </GridToScrollLi>
                    ))}
                </GridToScrollUl>
            </GridToScrollContainer>
        </section>
    );
}

export default NewReleases;
