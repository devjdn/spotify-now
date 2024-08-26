import { fetchNewMusicFriday } from "@/api/spotify";
import { Playlist } from "@/lib/global";
import { GridContainer, GridHeader, GridList, GridRow } from "../playlist-grid/playlist-grid";
import { Clock } from "lucide-react";

export default async function NMF() {
    const nmf: Playlist[] = await fetchNewMusicFriday();

    return (
        <section className="nmf" id="nmf">
            <h2>New Music Friday</h2>
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
                    {nmf.map((nmf, trackIndex) => (
                        <GridRow key={trackIndex}>
                            <div className="grid-col">
                                <p>{trackIndex + 1}</p>
                            </div>
                            <div className="grid-col">
                                <img loading="lazy" src={nmf.track.album.images[0]?.url} alt={nmf.track.name}/>
                                <div className="info">
                                    <strong>{nmf.track.name}</strong>
                                    <p>{nmf.track.artists[0]?.name}</p>
                                </div>
                            </div>
                            <div className="grid-col">
                                <p>{nmf.track.album.name}</p>
                            </div>
                            <div className="grid-col">
                                <p>{formatDuration(nmf.track.duration_ms)}</p>
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
