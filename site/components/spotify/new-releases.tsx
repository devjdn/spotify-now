import { fetchNewReleases } from "@/api/spotify";
import { Album } from "@/lib/global";

const NewReleases = async () => {
    const newReleases: Album[] = await fetchNewReleases();


    return(
        <section className="new-releases">
            <h2>New drops</h2>
            <div className="releases">
                <ul className="new-release-list">
                    {newReleases.map((album, albumIndex) => (
                        <li className="new-release-list-item" key={albumIndex}>
                            <img src={album.images[0]?.url} alt={album.name} />
                            <div className="album-info">
                                <p className="capitalize">{album.album_type}</p>
                                <a href={album.external_urls.spotify}>
                                    <span className="album-name">{album.name}</span>
                                </a>
                                <div className="artist-list">
                                    {album.artists.map((artist, index) => (
                                      <a key={index} href={artist.external_urls.spotify}>
                                        <span className="artist-name">{artist.name}</span>
                                      </a>
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default NewReleases;
