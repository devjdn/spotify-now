import { fetchGlobalTop50 } from "@/api/spotify";
import { Top50 } from "@/lib/global";
import { GridContainer, GridHeader, GridList, GridRow } from "../grid/grid";
import { format } from "path";

export default async function GlobalTop50() {
    const top50: Top50[] = await fetchGlobalTop50();

    return (
        <section className="global-top-50">
            <h2>Spotify Global Top 50</h2>
            <GridContainer>
                <GridHeader>
                    <p>#</p>
                    <p>Title</p>
                    <p>Album</p>
                    <p>Duration</p>
                </GridHeader>
                <GridList>
                    {top50.map((top50, trackIndex) => (
                        <GridRow key={trackIndex}>
                            <p>{trackIndex + 1}</p>
                            <img src={top50.track.album.images[0]?.url} alt={top50.track.name}/>
                            <p>{top50.track.name}</p>
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
