'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa6';

interface SongUrlProps {
  previewUrl: string;
}

export default function PreviewSongBtn({ previewUrl }: SongUrlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const currentAudio = audioRef.current;

    if (currentAudio) {
      const handleAudioEnd = () => setIsPlaying(false);
      currentAudio.addEventListener('ended', handleAudioEnd);

      return () => {
        currentAudio.removeEventListener('ended', handleAudioEnd);
      };
    }
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
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <audio ref={audioRef} src={previewUrl} />
    </>
  );
}
