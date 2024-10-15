import { Playlist, Album } from "@/lib/global";
import { FaSpotify } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import PreviewSongBtn from "../playlist-grid/song-preview";
import { SongActionsBtn } from "../buttons/song-action-btns";

interface ContentGridProps {
    fetchData: () => Promise<Album | Playlist>;
    data: Album | Playlist;
    contentType: 'playlist' | 'album'; // Prop to determine content type
}

const ContentGrid: React.FC<ContentGridProps> = async ({ fetchData, contentType }) => {
    const content = await fetchData();

    if (contentType === 'playlist') {
        const playlist = content as Playlist;
        return (
            <section className={`content playlist`}>
                <header className="content-header">
                    <div className="cover-art">
                        <Image fill priority src={playlist.images[0]?.url} alt={playlist.name} />
                    </div>
                    <div className="content-info">
                        <h3>{playlist.name}</h3>
                        <p>{playlist.description}</p>
                        <div className="content-actions">
                            <Link href={playlist.external_urls.spotify}>
                                <button className="action-btn">
                                    Listen on <FaSpotify />
                                </button>
                            </Link>
                        </div>
                    </div>
                </header>
                <div className="grid-container">
                    <header className="grid-header">
                        <div className="grid-col"><span className="song-text">Song</span></div>
                        <div className="grid-col"><span className="song-text">Album</span></div>
                        <div className="grid-col"><span className="song-text">Time</span></div>
                    </header>
                    <ul className="grid-ul">
                        {playlist.tracks.items.map((item, trackIndex) => (
                            <li className="grid-li" key={trackIndex}>
                                <div className="grid-col">
                                    <div className="song-media">
                                        <div className="artwork-container">
                                            <Image fill loading="lazy" src={item.track.album.images[0].url} alt={item.track.name} />
                                        </div>
                                        <PreviewSongBtn previewUrl={item.track.preview_url} />
                                    </div>
                                    <div className="details-container">
                                        <span className="song-text"><Link href={`/track/${item.track.id}`}>{item.track.name}</Link></span>
                                        <span className="song-text"><Link href={`/artist/${item.track.artists[0].id}`}>{item.track.artists[0].name}</Link></span>
                                    </div>
                                </div>
                                <div className="grid-col">
                                    <span className="song-text"><a href={`/album/${item.track.album.id}`}>{item.track.album.name}</a></span>
                                </div>
                                <div className="grid-col">
                                    <div className="duration">
                                        <span className="song-text">{formatDuration(item.track.duration_ms)}</span>
                                    </div>
                                    <SongActionsBtn songArtist={item.track.artists[0].name} songCover={item.track.album.images[0]?.url} songId={item.track.id} artistId={item.track.artists[0].id} songName={item.track.name} songAlbum={item.track.album.name} releaseType={item.track.type} popularity={item.track.popularity} releaseDate={item.track.album.release_date}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <footer className="content-footer">
                    <span className="song-text">{playlist.owner.display_name}</span>
                    {playlist.tracks.total === 1 ? 
                    <span className="song-text capitalize">{playlist.tracks.total} track</span> 
                    : 
                    <span className="song-text capitalize">{playlist.tracks.total} tracks</span>
                    }
                </footer>
            </section>
        );
    } else {
        const album = content as Album;
        return (
            <section className={`content album`}>
                <header className="content-header">
                    <div className="cover-art">
                        <Image fill priority src={album.images[0]?.url} alt={album.name} />
                    </div>
                    <div className="content-info">
                        <h3>{album.name}</h3>
                        <Link href={`/artist/${album.artists[0].id}`}>
                            <p>{album.artists[0].name}</p>
                        </Link>
                        <div className="content-actions">
                            <Link href={album.external_urls.spotify}>
                                <button className="action-btn">
                                    Listen on <FaSpotify />
                                </button>
                            </Link>
                        </div>
                    </div>
                </header>
                <div className="grid-container">
                    <ul className="grid-ul">
                        {album.tracks.items.map((item, trackIndex) => (
                            <li className="grid-li" key={trackIndex}>
                                <div className="grid-col">
                                    <div className="song-media">
                                        <PreviewSongBtn previewUrl={item.preview_url} />
                                        <div className="track-number">
                                            <span className="song-text">{item.track_number}</span>
                                        </div>
                                    </div>
                                    <div className="details-container">
                                        <span className="song-text"><Link href={`/track/${item.id}`}>{item.name}</Link></span>
                                    </div>
                                </div>
                                <div className="grid-col">
                                    <div className="duration">
                                        <span className="song-text">{formatDuration(item.duration_ms)}</span>
                                    </div>
                                    <SongActionsBtn songArtist={item.artists[0].name} songCover={album.images[0].url} songId={item.id} artistId={item.artists[0].id} songName={item.name} songAlbum={album.name} releaseType={item.type} popularity={album.popularity} releaseDate={album.release_date}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <footer className="content-footer">
                    <span className="song-text capitalize">{album.release_date}</span>
                    {album.total_tracks === 1 ? <span className="song-text capitalize">{album.total_tracks} track</span> : <span className="song-text capitalize">{album.total_tracks} tracks</span>}
                    <span className="song-text">{album.copyrights[0].text}</span>
                    <span className="song-text">{album.label}</span>
                </footer>
            </section>
        );
    }
};

function formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


export default ContentGrid;
