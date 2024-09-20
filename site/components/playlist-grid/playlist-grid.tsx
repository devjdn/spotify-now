import React from "react";
import { Clock } from "lucide-react";
import { Playlist } from "@/lib/global";
import { FaSpotify } from "react-icons/fa";
import PreviewSongBtn from "./song-preview";

interface PlaylistGridProps {
    playlist: Playlist;
    fetchPlaylist: () => Promise<Playlist>;
}

const PlaylistGrid: React.FC<PlaylistGridProps> = async ({ fetchPlaylist }) => {
    const playlist = await fetchPlaylist();
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
                        <a href={playlist.external_urls.spotify}>
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
                    {tracks.items.map((item, trackIndex) => (
                      <li key={trackIndex} className="grid-li">
                        <div className="grid-col">
                            <div className="song-media">
                                <img loading="lazy" src={item.track.album.images[0]?.url} alt={item.track.name} />
                                <PreviewSongBtn previewUrl={item.track.preview_url}/>
                            </div>
                          <div className="info">
                            <span className="song-text">{item.track.name}</span>
                            <span className="song-text">{item.track.artists[0]?.name}</span>
                          </div>
                        </div>
                        <div className="grid-col">
                            <a href={`/${item.track.album.id}`}>
                                <span className="song-text">{item.track.album.name}</span>
                            </a>
                        </div>
                        <div className="grid-col">
                          <span className="song-text">{formatDuration(item.track.duration_ms)}</span>
                        </div>
                      </li>
                    ))}
                </ul>
            </div>
            <footer className="content-footer">
                <p>{playlistOwner}</p>
                {trackCount === 1 ? 
                <p className="capitalize">{trackCount} track</p> 
                : 
                <p className="capitalize">{trackCount} tracks</p>
                }
            </footer>
        </section>
    );
}

function formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default PlaylistGrid;