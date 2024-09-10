import { fetchGlobalTop50 } from "@/api/top50-call";
import { Playlist } from "@/lib/global";
import { GridContainer, GridHeader, GridList, GridRow } from "../playlist-grid/playlist-grid";

export default async function GlobalTop50() {
    const playlist: Playlist = await fetchGlobalTop50();
    const trackCount = playlist.tracks.total;
    const playlistName = playlist.name;
    const playlistOwner = playlist.owner.display_name;
    const playlistDescription = playlist.description;

    return (
        <section className="global-top-50 playlist">
            <header className="playlist-header">
                <img src={playlist.images[0].url}/>
                <div className="playlist-info">
                    <h3>{playlistName}</h3>
                    <strong>{playlistOwner} &middot; {trackCount} tracks</strong>
                    <p>{playlistDescription}</p>
                </div>
            </header>
            <GridContainer>
                <GridHeader/>
                <GridList>
                    {playlist.tracks.items.map((item, trackIndex) => (
                        <GridRow key={trackIndex}>
                            <div className="grid-col">
                                <img loading="lazy" src={item.track.album.images[0]?.url} alt={item.track.name}/>
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
                        </GridRow>
                    ))}
                </GridList>
            </GridContainer>
        </section>
    );
}

// Helper function to format duration from milliseconds to mm:ss
function formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
