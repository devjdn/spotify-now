import { Album } from "@/lib/global";
import { FaSpotify } from "react-icons/fa";
import { ArtistAlbums } from "./artist-albums";


interface AlbumGridProps {
    album: Album;
    fetchAlbum: () => Promise<Album>;
}

const AlbumGrid: React.FC<AlbumGridProps> = async ({fetchAlbum}) => {
    const album = await fetchAlbum();
    const { name: albumName, album_type, images, release_date, artists, restrictions, genres, popularity, total_tracks, label } = album;
    const artistId = artists[0].id;
    const artistName = artists[0].name;

    return(
        <section className="content album">
            <header className="content-header">
                <img src={images[0].url} alt={albumName} />
                <div className="content-info">
                    <h3>{albumName}</h3>
                    <h3>{artists[0].name}</h3>
                    <div className="content-actions">
                        <a href={album.external_urls.spotify}>
                            <button className="action-btn">
                                Listen on
                                <FaSpotify/>
                            </button>
                        </a>
                    </div>
                </div>
            </header>
            <div className="grid-container">
                <ul className="grid-ul">
                    {album.tracks.items.map((item, trackIndex) => (
                        <li key={trackIndex} className="grid-li">
                            <div className="grid-col">
                                <span className="song-text">{item.track_number}</span>
                            </div>
                            <div className="grid-col">
                                <span className="song-text">{item.name}</span>
                            </div>
                            <div className="grid-col">
                                <span className="song-text">{formatDuration(item.duration_ms)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <footer className="content-footer">
                <p className="capitalize">{release_date}</p>
                {total_tracks === 1 ? <p className="capitalize">{total_tracks} track</p> : <p className="capitalize">{total_tracks} tracks</p>}
                <p>{album.copyrights[0].text}</p>
                <p>{label}</p>
            </footer>
            <ArtistAlbums artistId={artistId} artistName={artistName}/>
        </section>
    );
}

function formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


export default AlbumGrid;