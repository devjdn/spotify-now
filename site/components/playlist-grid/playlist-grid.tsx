import React from "react";
import { Clock } from "lucide-react";
import { Playlist } from "@/lib/global";
import { FaSpotify } from "react-icons/fa";

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
        <section className="playlist">
            <header className="playlist-header">
                <img src={playlist.images[0].url}/>
                <div className="playlist-info">
                    <h3>{playlistName}</h3>
                    <strong>{playlistOwner} &middot; {trackCount} tracks</strong>
                    <p>{description}</p>
                    <div className="playlist-actions">
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
                <header className="grid-header">
                    <div className="grid-col">
                        <strong>Title</strong>
                    </div>
                    <div className="grid-col">
                        <strong>Album</strong>
                    </div>
                    <div className="grid-col">
                        <Clock size={20}/>
                    </div>
                </header>
                <ul className="grid-ul">
                    {tracks.items.map((item, trackIndex) => (
                      <li key={trackIndex} className="grid-li">
                        <div className="grid-col">
                          <img loading="lazy" src={item.track.album.images[0]?.url} alt={item.track.name} />
                          <div className="info">
                            <p>{item.track.name}</p>
                            <p>{item.track.artists[0]?.name}</p>
                          </div>
                        </div>
                        <div className="grid-col">
                          <p>{item.track.album.name}</p>
                        </div>
                        <div className="grid-col">
                          <p>{formatDuration(item.track.duration_ms)}</p>
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

export default PlaylistGrid;