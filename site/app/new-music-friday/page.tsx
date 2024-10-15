import { Album, Playlist } from "@/lib/global";
import { fetchPlaylistTracks } from "@/api/playlist/[playlistId]/route";
import ContentGrid from "@/components/grid/content-grid";

export default async function NewMusicFriday() {
    let playlistId = '37i9dQZF1DX4JAvHpjipBk';
    const playlist: Playlist = await fetchPlaylistTracks({ playlistId });

    const fetchData = async (): Promise<Playlist> => {
        return await fetchPlaylistTracks({ playlistId });
    };

    return <ContentGrid fetchData={fetchData} data={playlist} contentType="playlist" />;
}