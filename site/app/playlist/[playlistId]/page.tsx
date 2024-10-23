import { fetchPlaylist, fetchPlaylistTracks } from "@/api/playlist/[playlistId]/route";
import { Playlist } from "@/lib/global";
import ContentGrid from "@/components/grid/content-grid";

export default async function PlaylistTracksPage({params}: {params: Promise<{ playlistId: string; }>}) {
  const { playlistId } = await params;
  const playlist: Playlist = await fetchPlaylist({ playlistId });

  const fetchData = async (): Promise<Playlist> => {
    return await fetchPlaylist({ playlistId });
  };

  return(
    <ContentGrid fetchData={fetchData} data={playlist} contentType='playlist' fetchPlaylistTracks={() => fetchPlaylistTracks({playlistId})}/>
  );
}