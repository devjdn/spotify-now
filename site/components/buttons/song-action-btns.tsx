'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { BookAudio, Ellipsis, LibraryBig, MicVocal, X } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa';
import { SongDetailsMenu } from '../song-details-menu';

export interface ActionBtnProps {
    albumId: string;
    songId: string;
    songName: string;
    songArtist: string;
    songAlbum: string;
    songCover: string;
    releaseType: string;
    popularity: number;
    releaseDate: string;
    chartRank: number;
}

export const SongActionsBtn = ({albumId, songId, songName, songArtist, songCover, songAlbum, popularity, releaseType, releaseDate, chartRank}: ActionBtnProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSongMenuOpen, setIsSongMenuOpen] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<React.ReactNode | null>(null)
    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null)

    const toggleActionsMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

    useEffect(() => {
        const handleOutsideMenu = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideMenu);
        return () => {
          document.removeEventListener('mousedown', handleOutsideMenu);
        };
    });

    const songActions = [
        { name: 'Go to album', icon: <LibraryBig/>, onClick: () => router.push(`/album/${albumId}`) },
        { name: 'Go to artist', icon: <MicVocal/>, onClick: () => router.push(`/album/${albumId}`) },
        { name: 'Song details', icon: <BookAudio/>, onClick: () => {setIsSongMenuOpen(true)}},
        { name: 'Listen on Spotify', icon: <FaSpotify size={24}/>, onClick: () => router.push(`https://open.spotify.com/track/${songId}`) },
    ]

    useEffect(() => {
        if(isSongMenuOpen) {
            setSelectedMenu(
                <SongDetailsMenu 
                setIsSongMenuOpen={setIsSongMenuOpen}
                isSongMenuOpen={isSongMenuOpen}
                chartRank={chartRank}
                songName={songName}
                songArtist={songArtist}
                songAlbum={songAlbum}
                songCover={songCover}
                releaseType={releaseType}
                popularity={popularity}
                releaseDate={releaseDate}/>); 
        } else {
            setSelectedMenu(null);
            setIsSongMenuOpen(false);
        }
    }, [isSongMenuOpen, chartRank, songName, songArtist, songCover, popularity, releaseDate])

    return(
        <>
            <div className="song-actions-menu-wrapper" ref={ref}>
                <button className="song-actions-btn" name="song-actions-btn" onClick={toggleActionsMenu} ref={buttonRef}>
                    <Ellipsis size={18}/>
                </button>
                <div className="song-actions-menu" aria-expanded={isMenuOpen}>
                    <ul className='song-actions-ul'>
                        {songActions.map((action, actionIndex) => (
                            <li className="song-actions-li" key={actionIndex}>
                                <button className='action' name='action' onClick={action.onClick}>
                                    <p className="song-text">{action.name}</p>
                                    {action.icon}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {selectedMenu && createPortal (
                selectedMenu,
                document.getElementById('menu-root') as HTMLElement
            )}
            <div id="menu-root"></div>
        </>
    );
}