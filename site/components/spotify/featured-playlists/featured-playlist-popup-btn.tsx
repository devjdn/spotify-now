'use client';

import { CgPlayList } from "react-icons/cg";
import { useState, useEffect } from 'react';

export default function PlaylistPopupBtn() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const togglePlaylistPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  useEffect(() => {
    const popupElement = document.getElementById('playlist-tracks-popup');
    if (popupElement) {
      popupElement.setAttribute('aria-expanded', isPopupOpen.toString());
    }
  }, [isPopupOpen]);

  return (
    <button 
      className="playlist-pop-up-btn" 
      onClick={togglePlaylistPopup}
      aria-controls="playlist-tracks-popup"
      aria-expanded={isPopupOpen}
    >
      <CgPlayList/>
    </button>
  );
}