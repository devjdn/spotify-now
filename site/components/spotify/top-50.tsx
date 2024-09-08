import { fetchGlobalTop50 } from "@/api/top50-call";
import { Playlist } from "@/lib/global";
import { GridContainer, GridHeader, GridList, GridRow } from "../playlist-grid/playlist-grid";
import { Clock } from "lucide-react";

export default async function GlobalTop50() {
    const top50: Playlist = await fetchGlobalTop50();
    const trackCount = top50.tracks.total;
    const playlistName = top50.name;
    const playlistOwner = top50.owner.display_name;
    const playlistDescription = top50.description;

    return (
        <section className="global-top-50 playlist">
            <header className="playlist-header">
                <img src={top50.images[0].url}/>
                <div className="playlist-info">
                    <h3>{playlistName}</h3>
                    <strong>{playlistOwner} &middot; {trackCount} tracks</strong>
                    <p>{playlistDescription}</p>
                </div>
            </header>
            <GridContainer>
                <GridHeader>
                    <div className="grid-col">
                        <strong>Title</strong>
                    </div>
                    <div className="grid-col">
                        <strong>Album</strong>
                    </div>
                    <div className="grid-col">
                        <Clock size={20}/>
                    </div>
                </GridHeader>
                <GridList>
                    {top50.tracks.items.map((item, trackIndex) => (
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
