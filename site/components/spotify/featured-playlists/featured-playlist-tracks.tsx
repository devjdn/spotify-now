// PlaylistTracks.tsx
import { fetchPlaylistTracks, PlaylistProps } from "@/api/spotify";
import { Playlist } from "@/lib/global";
import { GridContainer, GridHeader, GridList, GridRow } from "@/components/playlist-grid/playlist-grid";
import { Clock } from 'lucide-react';

export default async function PlaylistTracks({ playlistId }: PlaylistProps) {
  const tracks: Playlist[] = await fetchPlaylistTracks({ playlistId });

  return (
    <>
      <div id="playlist-tracks-popup" className="playlist-tracks-popup">
        <GridContainer>
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
              <Clock/>
            </div>
          </GridHeader>
          <GridList>
            {tracks.map((tracks, trackIndex) => (
              <GridRow key={trackIndex}>
                <div className="grid-col">
                  <p>{trackIndex + 1}</p>
                </div>
                <div className="grid-col">
                  <img loading="lazy" src={tracks.track.album.images[0]?.url} alt={tracks.track.name}/>
                  <div className="info">
                    <strong>{tracks.track.name}</strong>
                    <p>{tracks.track.artists[0]?.name}</p>
                  </div>
                </div>
                <div className="grid-col">
                  <p>{tracks.track.album.name}</p>
                </div>
                <div className="grid-col">
                  <p>{formatDuration(tracks.track.duration_ms)}</p>
                </div>
              </GridRow>
            ))}
          </GridList>
        </GridContainer>
      </div>
    </>
  );
}

// Helper function to format duration from milliseconds to mm:ss
function formatDuration(durationMs: number): string {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}