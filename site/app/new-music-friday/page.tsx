import { Playlist } from "@/lib/global";
import { fetchPlaylist, fetchPlaylistTracks } from "@/api/playlist/[playlistId]/route";
import ContentGrid from "@/components/grid/content-grid";

export default async function NewMusicFriday() {
    let playlistId = '37i9dQZF1DX4JAvHpjipBk';
    const playlist: Playlist = await fetchPlaylist({ playlistId });

    const fetchData = async (): Promise<Playlist> => {
        return await fetchPlaylist({ playlistId });
    };

    return <ContentGrid fetchData={fetchData} data={playlist} contentType="playlist" fetchPlaylistTracks={() => fetchPlaylistTracks({playlistId})}/>;
}