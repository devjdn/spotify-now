import { fetchPlaylistTracks, PlaylistProps } from "@/api/spotify";
import { Playlist } from "@/lib/global";
import { GridContainer, GridHeader, GridList, GridRow } from "@/components/playlist-grid/playlist-grid";
import { Clock, X } from 'lucide-react';
import PlaylistToggleButton from './popup-btn';

export default async function PlaylistTracks({ playlistId, playlistName }: PlaylistProps) {

  const playlistTracks: Playlist[] = await fetchPlaylistTracks({ playlistId, playlistName });

  return (
    <div className="popup-tracks-container">
      <GridContainer>
        <header className="playlist-header">
          <h3>{playlistName}</h3>
          <PlaylistToggleButton playlistId={playlistId}>
            <X />
          </PlaylistToggleButton>
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
    </div>
  );
}

function formatDuration(durationMs: number): string {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
