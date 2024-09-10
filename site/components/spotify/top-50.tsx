import { fetchGlobalTop50 } from "@/api/top50-call";
import { Playlist } from "@/lib/global";
import PlaylistGrid from "../playlist-grid/playlist-grid";

export default async function GlobalTop50() {
    const playlist: Playlist = await fetchGlobalTop50();

    return <PlaylistGrid playlist={playlist} fetchPlaylist={fetchGlobalTop50}/>;
}

// Helper function to format duration from milliseconds to mm:ss
function formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
