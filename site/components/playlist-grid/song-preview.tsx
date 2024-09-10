'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CgPlayButton, CgPlayPause } from 'react-icons/cg'; 

interface SongUrlProps {
  previewUrl: string;
}

export default function PreviewSongBtn({ previewUrl }: SongUrlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, []);

  const toggleSongPreview = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!previewUrl) {
    return null;
  }

  return (
    <>
      <button className="audio-toggle-btn" onClick={toggleSongPreview}>
        {isPlaying ? <CgPlayPause size={40} /> : <CgPlayButton size={40} />}
      </button>
      <audio ref={audioRef} src={previewUrl} />
    </>
  );
}