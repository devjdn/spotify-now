import { fetchPlaylistTracks } from "@/api/playlist/[playlistId]/route";
import { Playlist } from "@/lib/global";
import PlaylistGrid from "@/components/playlist-grid/playlist-grid";
import ContentGrid from "@/components/grid/content-grid";

export default async function PlaylistTracksPage({params}: {params: { playlistId: string; }}) {
  const { playlistId } = params;
  const playlist: Playlist = await fetchPlaylistTracks({ playlistId });

  const fetchData = async (): Promise<Playlist> => {
    return await fetchPlaylistTracks({ playlistId });
  };

  return(
    <ContentGrid fetchData={fetchData} data={playlist} contentType='playlist'/>
  );
}