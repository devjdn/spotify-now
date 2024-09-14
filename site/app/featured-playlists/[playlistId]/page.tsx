import { fetchPlaylistTracks } from "@/api/playlist/[playlistId]/route";
import { Playlist } from "@/lib/global";
import PlaylistGrid from "@/components/playlist-grid/playlist-grid";

export default async function PlaylistTracksPage({params}: {params: { playlistId: string; }}) {
  const { playlistId } = params;
  const playlist: Playlist = await fetchPlaylistTracks({ playlistId });

  return <PlaylistGrid playlist={playlist} fetchPlaylist={() => fetchPlaylistTracks({ playlistId })}></PlaylistGrid>;
}