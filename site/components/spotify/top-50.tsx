import { fetchGlobalTop50 } from "@/api/spotify";
import { Top50 } from "@/lib/global";
import { GridContainer, GridHeader, GridList, GridRow } from "../playlist-grid/playlist-grid";
import { Clock } from "lucide-react";

export default async function GlobalTop50() {
    const top50: Top50[] = await fetchGlobalTop50();

    return (
        <section className="global-top-50">
            <h2>Spotify Global Top 50</h2>
            <GridContainer>
                <GridHeader>
                    <div className="grid-col">
                        <h4>#</h4>
                    </div>
                    <div className="grid-col">
                        <h4>Title</h4>
                    </div>
                    <div className="grid-col">
                        <h4>Album</h4>
                    </div>
                    <div className="grid-col">
                        <Clock/>
                    </div>
                </GridHeader>
                <GridList>
                    {top50.map((top50, trackIndex) => (
                        <GridRow key={trackIndex}>
                            <div className="grid-col">
                                <p>{trackIndex + 1}</p>
                            </div>
                            <div className="grid-col">
                                <img loading="lazy" src={top50.track.album.images[0]?.url} alt={top50.track.name}/>
                                <div className="info">
                                    <strong>{top50.track.name}</strong>
                                    <p>{top50.track.artists[0]?.name}</p>
                                </div>
                            </div>
                            <div className="grid-col">
                                <p>{top50.track.album.name}</p>
                            </div>
                            <div className="grid-col">
                                <p>{formatDuration(top50.track.duration_ms)}</p>
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
