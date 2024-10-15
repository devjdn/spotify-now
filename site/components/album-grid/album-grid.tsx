import { Album } from "@/lib/global";
import { FaSpotify } from "react-icons/fa";
import { ArtistAlbums } from "./artist-albums";
import { SongActionsBtn } from "../buttons/song-action-btns";
import Link from "next/link";


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
                    <Link href={`/artist/${artistId}`}>
                        <p>{artists[0].name}</p>
                    </Link>
                    <div className="content-actions">
                        <Link href={album.external_urls.spotify}>
                            <button className="action-btn">
                                Listen on
                                <FaSpotify/>
                            </button>
                        </Link>
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
                                <Link href={`/track/${item.id}`}>
                                    <span className="song-text">{item.name}</span>
                                </Link>
                            </div>
                            <div className="grid-col">
                                <span className="song-text">{formatDuration(item.duration_ms)}</span>
                            </div>
                            <div className="grid-col">
                                <SongActionsBtn songArtist={item.artists[0]?.name} songCover={album.images[0]?.url} songId={item.id} artistId={item.artists[0].id} songName={item.name} songAlbum={album.name} releaseType={item.type} popularity={album.popularity} releaseDate={album.release_date}/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <footer className="content-footer">
                <span className="song-text capitalize">{release_date}</span>
                {total_tracks === 1 ? <span className="song-text capitalize">{total_tracks} track</span> : <span className="song-text capitalize">{total_tracks} tracks</span>}
                <span className="song-text">{album.copyrights[0].text}</span>
                <span className="song-text">{label}</span>
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