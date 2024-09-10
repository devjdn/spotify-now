import { fetchNewMusicFriday } from "@/api/nmf-call";
import { Playlist } from "@/lib/global";
import PlaylistGrid from "../playlist-grid/playlist-grid";

export default async function NMF() {
    const playlist: Playlist = await fetchNewMusicFriday();

    return <PlaylistGrid playlist={playlist} fetchPlaylist={fetchNewMusicFriday} />;
}
