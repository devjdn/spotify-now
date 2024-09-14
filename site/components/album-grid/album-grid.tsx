import { Clock } from "lucide-react";
import { Album } from "@/lib/global";
import { FaSpotify } from "react-icons/fa";
import React from "react";

interface AlbumGridProps {
    album: Album;
    fetchAlbum: () => Promise<Album>;
}

const AlbumGrid: React.FC<AlbumGridProps> = async ({fetchAlbum}) => {
    const album = await fetchAlbum();
    const { name: albumName, album_type, images, release_date, artists, restrictions, copyrights, genres, popularity, total_tracks, label } = album;

    return(
        <section className="album">
            <header className="album-header">
                <img src={images[0].url} alt={albumName} />
                <div className="album-info">
                    <h3>{albumName}</h3>
                    <h3>{artists[0].name}</h3>
                    <p className="capitalize">{album_type} &middot; {release_date} &middot; {total_tracks} tracks</p>
                    <p>{label}</p>
                </div>
            </header>
            <div className="grid-container">
                <ul className="grid-ul">
                    {album.tracks.items.map((item, trackIndex) => (
                        <li key={trackIndex} className="grid-li">
                            <div className="grid-col">
                                <p>{item.track_number}</p>
                            </div>
                            <div className="grid-col">
                                <p>{item.name}</p>
                            </div>
                            <div className="grid-col">
                                <p>{formatDuration(item.duration_ms)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


export default AlbumGrid;