import { fetchGlobalTop50 } from "@/api/spotify";
import { Top50 } from "@/lib/global";
import { GridContainer, GridHeader, GridList, GridRow } from "../grid/grid";
import { Clock } from "lucide-react";

export default async function GlobalTop50() {
    const top50: Top50[] = await fetchGlobalTop50();

    return (
        <section className="global-top-50">
            <h2>Spotify Global Top 50</h2>
            <GridContainer>
                <GridHeader>
                    <h4>#</h4>
                    <h4>Title</h4>
                    <h4>Album</h4>
                    <Clock/>
                </GridHeader>
                <GridList>
                    {top50.map((top50, trackIndex) => (
                        <GridRow key={trackIndex}>
                            <p>{trackIndex + 1}</p>
                            <div className="track-info">
                                <img loading="lazy" src={top50.track.album.images[0]?.url} alt={top50.track.name}/>
                                <div className="info">
                                    <span>{top50.track.name}</span>
                                    <p>{top50.track.artists[0]?.name}</p>
                                </div>
                            </div>
                            <p>{top50.track.album.name}</p>
                            <p>{formatDuration(top50.track.duration_ms)}</p>
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
