import { ListVideo } from 'lucide-react';
import PlaylistToggleButton from './popup-btn';
import PlaylistTracks from './tracks';
import { PlaylistProps } from '@/api/spotify';

export default function PlaylistPopup({ playlistId, playlistName }: PlaylistProps) {
  return (
    <>
      <PlaylistToggleButton playlistId={playlistId}>
        <ListVideo size={24}/>
      </PlaylistToggleButton>

      <div 
        id={`playlist-tracks-popup-${playlistId}`}
        className={`playlist-tracks-popup playlist-tracks-popup-${playlistId}`} 
        data-playlist-id={playlistId}
        hidden
      >
        <PlaylistTracks playlistName={playlistName} playlistId={playlistId}/>
      </div>
    </>
  );
}