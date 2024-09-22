import { fetchGlobalTop50 } from "@/api/top50-call";
import { Playlist } from "@/lib/global";
import { FaSpotify } from "react-icons/fa";

export default async function GlobalTop50() {
    const playlist: Playlist = await fetchGlobalTop50();
    const reversedRankings = playlist.tracks.items.reverse();
    const totalTracks = reversedRankings.length;

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
                    {reversedRankings.map((ranking, rankIndex) => (
                        <li className="chart-ranking-li" key={rankIndex}>
                            <span className="chart-rank">{totalTracks - rankIndex}</span>
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
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}