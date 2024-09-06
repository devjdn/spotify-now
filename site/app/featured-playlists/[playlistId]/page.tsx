import { fetchPlaylistTracks, PlaylistProps } from "@/api/[playlistId]/route";
import { Playlist } from "@/lib/global";
import { GridContainer, GridHeader, GridList, GridRow } from "@/components/playlist-grid/playlist-grid";
import { Clock } from 'lucide-react';

export default async function PlaylistTracksPage({params}: {params: { playlistId: string; }}) {
  const { playlistId } = params;
  const playlistTracks: Playlist = await fetchPlaylistTracks({ playlistId });
  const playlistName = playlistTracks.name;
  const trackCount = playlistTracks.tracks.total;
  const playlistOwner = playlistTracks.owner.display_name;
  const playlistDescription = playlistTracks.description;

  return (
    <section className="playlist playlist-id">
      <GridContainer>
        <header className="playlist-header">
          <img src={playlistTracks.images[0].url}/>
          <div className="playlist-info">
              <h3>{playlistName}</h3>
              <ul className="playlist-info-ul">
                <li className="playlist-info-li">
                  <strong>{playlistDescription}</strong>
                </li>
                <li className="playlist-info-li">
                  <p>{playlistOwner}</p>
                </li>
                <li className="playlist-info-li">
                  <p>{trackCount} Tracks</p>
                </li>
              </ul>
          </div>
        </header>
        <GridHeader>
          <div className="grid-col">
            <strong>Title</strong>
          </div>
          <div className="grid-col">
            <strong>Album</strong>
          </div>
          <div className="grid-col">
            <Clock size={20}/>
          </div>
        </GridHeader>
        <GridList>
          {playlistTracks.tracks.items.map((track, trackIndex) => (
            track.track && (
              <GridRow key={trackIndex}>
                <div className="grid-col">
                  <img loading="lazy" src={track.track.album.images[0]?.url} alt={track.track.name} />
                  <div className="info">
                    <p>{track.track.name}</p>
                    <p>{track.track.artists[0]?.name}</p>
                  </div>
                </div>
                <div className="grid-col">
                  <p>{track.track.album.name}</p>
                </div>
                <div className="grid-col">
                  <p>{formatDuration(track.track.duration_ms)}</p>
                </div>
              </GridRow>
            )
          ))}
        </GridList>
      </GridContainer>
    </section>
  );
}

function formatDuration(durationMs: number): string {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
