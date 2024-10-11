import PlaylistGrid from "@/components/playlist-grid/playlist-grid";
import { Playlist } from "@/lib/global";
import { fetchPlaylistTracks } from "@/api/playlist/[playlistId]/route";

export default async function NewMusicFriday() {
    let playlistId = '37i9dQZF1DX4JAvHpjipBk';
    const playlist: Playlist = await fetchPlaylistTracks({ playlistId });

    return <PlaylistGrid playlist={playlist} fetchPlaylist={() => fetchPlaylistTracks({ playlistId })}/>;
}