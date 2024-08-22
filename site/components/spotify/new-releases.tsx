import { fetchNewReleases } from "@/api/spotify";
import { Album } from "@/lib/global";
import { ScrollContainer, ScrollList, ScrollListItem } from "../scroll/scroll-container";

const NewReleases = async () => {
    const newReleases: Album[] = await fetchNewReleases();


    return(
        <section className="new-releases">
            <h2>New drops</h2>
            <ScrollContainer>
                <ScrollList>
                    {newReleases.map((album, albumIndex) => (
                        <ScrollListItem key={albumIndex}>
                            <img src={album.images[0]?.url} alt={album.name} />
                            <div className="info">
                                <a href={album.external_urls.spotify}>
                                    <span className="name">{album.name}</span>
                                </a>
                                <div className="artist-list">
                                    {album.artists.map((artist, index) => (
                                      <a key={index} href={artist.external_urls.spotify}>
                                        <span className="name">{artist.name}</span>
                                      </a>
                                    ))}
                                </div>
                                <p className="capitalize">{album.album_type}</p>
                            </div>
                        </ScrollListItem>
                    ))}
                </ScrollList>
            </ScrollContainer>
        </section>
    );
}

export default NewReleases;
