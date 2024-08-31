'use client';

import { PlaylistProps } from '@/api/spotify';

interface PlaylistBtnProps {
    playlistId: string;
    children: React.ReactNode;
}

export default function PlaylistToggleButton({ playlistId, children }: PlaylistBtnProps) {
  function togglePopup() {
    const popupBtn = document.getElementById(`playlist-popup-btn-${playlistId}`);
    const popup = document.getElementById(`playlist-tracks-popup-${playlistId}`);
    
    if (popupBtn && popup) {
      const isExpanded = popupBtn.getAttribute('aria-expanded') === 'true';
      popupBtn.setAttribute('aria-expanded', (!isExpanded).toString());
      popup.hidden = isExpanded;
    }
  }

  return (
    <button 
      className="playlist-pop-up-btn" 
      id={`playlist-popup-btn-${playlistId}`}
      data-playlist-id={playlistId} 
      onClick={togglePopup}
      aria-controls={`playlist-tracks-popup-${playlistId}`}
      aria-expanded="false"
    >
        {children}
    </button>
  );
}