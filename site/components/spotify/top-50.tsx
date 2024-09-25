import { fetchGlobalTop50 } from "@/api/top50-call";
import { Playlist } from "@/lib/global";
import { FaSpotify } from "react-icons/fa";
import { SongActionsBtn } from "../buttons/song-action-btns";
import { SongDetailsMenu } from "../song-details-menu";

export default async function GlobalTop50() {
    const playlist: Playlist = await fetchGlobalTop50();
    const totalTracks = playlist.tracks.items.length;

    return(
        <section className="content top-50">
            <header className="content-header">
                <img loading="lazy" src={playlist.images[0].url} alt={playlist.name}/>
                <div className="content-info">
                    <h3>Global Top Songs</h3>
                    <p>{playlist.description}</p>
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
            <div className="chart-ranking-container">
                <ol className="chart-ranking-ol">
                    {playlist.tracks.items.map((ranking, rankIndex) => (
                        <li className="chart-ranking-li" id={`n${rankIndex + 1}`} key={rankIndex}>
                            <span className="chart-rank">{rankIndex + 1}</span>
                            <div className="song-details">
                                <img loading="lazy" src={ranking.track.album.images[1].url} alt={ranking.track.name} />
                                <div className="info">
                                    <h3>{ranking.track.name}</h3>
                                    {ranking.track.artists.length > 1 ?
                                        <span className="song-text">{ranking.track.artists.map(artist => artist.name).join(' & ')}</span>
                                    : 
                                        <span className="song-text">{ranking.track.artists[0].name}</span>
                                    }
                                </div>
                                <SongActionsBtn songArtist={ranking.track.artists[0].name} songCover={ranking.track.album.images[0].url} songId={ranking.track.id} songName={ranking.track.name} songAlbum={ranking.track.album.name} releaseType={ranking.track.type} popularity={ranking.track.popularity} albumId={ranking.track.album.id} releaseDate={ranking.track.album.release_date} chartRank={rankIndex + 1}/>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}