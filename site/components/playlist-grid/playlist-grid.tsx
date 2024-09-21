import React from "react";
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

    const featuredAlbums = Array.from(new Set(tracks.items.map((albumId => albumId.track.album.id)).map(id => {
        const album = tracks.items.find(item => item.track.album.id === id)?.track.album;
        return album;
    }))).filter((album): album is NonNullable<typeof album> => album !== null);


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
                            <a href={`/album/${item.track.album.id}`}>
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
            <div className="featured-content">
                <h3>Featured Albums</h3>
                <div className="featured-content-scroll">
                    <div className="scroll-shadow left"></div>
                    <div className="scroll-shadow right"></div>
                    <ul className="featured-content-ul">
                        <div className="scroll-shadow left"></div>
                        <div className="scroll-shadow right"></div>
                        {featuredAlbums.map((album, albumIndex) => (
                            <li className="featured-content-li" key={albumIndex}>
                                <img loading="lazy" src={album.images[0].url} alt={album.name}/>
                                <div className="info">
                                    <a href={`/album/${album.id}`}>
                                        <strong>{album.name}</strong>
                                    </a>
                                    <p>{album.artists[0].name}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
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