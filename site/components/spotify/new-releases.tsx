import { fetchNewReleases } from "@/api/new-releases-call";
import { Album } from "@/lib/global";
import { GridToScrollContainer, GridToScrollUl, GridToScrollLi } from "../grid-to-scroll/grid-to-scroll";

const NewReleases = async () => {
    const newReleases: Album[] = await fetchNewReleases();


    return(
        <section className="new-releases" id="new-drops">
            <h2>New Drops</h2>
            <GridToScrollContainer>
                <GridToScrollUl>
                    {newReleases.map((album, albumIndex) => (
                        <GridToScrollLi key={albumIndex}>
                            <img src={album.images[0]?.url} alt={album.name} />
                            <div className="info">
                                <a href={`/album/${album.id}`}>
                                    <strong>{album.name}</strong>
                                </a>
                                <div className="artist-list">
                                    <a href={album.artists[0].external_urls.spotify}>
                                      <strong>{album.artists[0].name}</strong>
                                    </a>
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
