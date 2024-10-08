import { fetchHighlightedPlaylist } from "@/api/highlighted-playists";
import { Playlist } from "@/lib/global";
import { FaSpotify } from "react-icons/fa";
import PreviewSongBtn from "../playlist-grid/song-preview";
import { ScrollBtns } from "../buttons/scroll-btns";
import { SongActionsBtn } from "../buttons/song-action-btns";
import Link from "next/link";

export default async function NMF({playlistId}: {playlistId: string}) {
    const playlist: Playlist = await fetchHighlightedPlaylist({playlistId});
    const { name: playlistName, tracks, owner, description, images} = playlist;
    const trackCount = tracks.total;
    const playlistOwner = owner.display_name;

    return(
        <section className="content playlist">
            <header className="content-header">
                <img src={playlist.images[0].url}/>
                <div className="content-info">
                    <h3>{playlistName}</h3>
                    <p>{description}</p>
                    <div className="content-actions">
                        <Link href={playlist.external_urls.spotify}>
                            <button className="action-btn">
                                Listen on
                                <FaSpotify/>
                            </button>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="grid-container">
                <header className="grid-header">
                    <div className="grid-col">
                        <span className="song-text">Song</span>
                    </div>
                    <div className="grid-col">
                        <span className="song-text">Album</span>
                    </div>
                    <div className="grid-col">
                        <span className="song-text">Time</span>
                    </div>
                </header>
                <ul className="grid-ul">
                    {tracks.items.map((item, trackIndex) => (
                      <li key={trackIndex} className="grid-li">
                        <div className="grid-col">
                            <div className="song-media">
                                <img loading="lazy" src={item.track.album.images[0]?.url} alt={item.track.name} />
                                <PreviewSongBtn previewUrl={item.track.preview_url}/>
                            </div>
                            <div className="info">
                                <Link href={`/track/${item.track.id}`}>
                                    <span className="song-text">{item.track.name}</span>
                                </Link>
                                <Link href={`/artist/${item.track.artists[0]?.id}`}>
                                    <span className="song-text">{item.track.artists[0]?.name}</span>
                                </Link>
                            </div>
                        </div>
                        <div className="grid-col">
                            <Link href={`/album/${item.track.album.id}`}>
                                <span className="song-text">{item.track.album.name}</span>
                            </Link>
                        </div>
                        <div className="grid-col">
                          <span className="song-text">{formatDuration(item.track.duration_ms)}</span>
                        </div>
                        <SongActionsBtn songArtist={item.track.artists[0]?.name} songCover={item.track.album.images[0]?.url} songId={item.track.id} artistId={item.track.artists[0].id} songName={item.track.name} songAlbum={item.track.album.name} releaseType={item.track.type} popularity={item.track.popularity} albumId={item.track.album.id} releaseDate={item.track.album.release_date}/>
                      </li>
                    ))}
                </ul>
            </div>
        </section>   
    )
}

function formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}