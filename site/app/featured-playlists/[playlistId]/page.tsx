import { fetchPlaylistTracks, PlaylistProps } from "@/api/spotify";
import { Playlist } from "@/lib/global";
import { GridContainer, GridHeader, GridList, GridRow } from "@/components/playlist-grid/playlist-grid";
import { Clock } from 'lucide-react';

export default async function PlaylistTracksPage({params}: {params: { playlistId: string; }}) {
  const { playlistId } = params;
  const playlistTracks: Playlist[] = await fetchPlaylistTracks({ playlistId });

  return (
    <section className="playlist-id">
      <GridContainer>
        <header className="playlist-header">
        </header>
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
            <Clock />
          </div>
        </GridHeader>
        <GridList>
          {playlistTracks.map((track, trackIndex) => (
            track.track && (
              <GridRow key={trackIndex}>
                <div className="grid-col">
                  <p>{trackIndex + 1}</p>
                </div>
                <div className="grid-col">
                  <img loading="lazy" src={track.track.album.images[0]?.url} alt={track.track.name} />
                  <div className="info">
                    <strong>{track.track.name}</strong>
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
