'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Ellipsis, GalleryVerticalEnd, MicVocal } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa';
import { SongDetailsMenu } from '../song-details-menu';

export interface ActionBtnProps {
    albumId?: string;
    songId: string;
    artistId: string | undefined;
    songName: string;
    songArtist: string | undefined;
    songAlbum?: string;
    songCover: string;
    releaseType: string;
    popularity: number;
    releaseDate: string;
    chartRank?: number;
}

export const SongActionsBtn = ({albumId, artistId, songId, songName, songArtist, songCover, songAlbum, popularity, releaseType, releaseDate, chartRank}: ActionBtnProps) => {
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
        albumId ? { name: 'Go to album', icon: <GalleryVerticalEnd size={20} strokeWidth={1.75}/>, onClick: () => router.push(`/album/${albumId}`) } : null,
        { name: 'Go to artist', icon: <MicVocal size={20} strokeWidth={1.75}/>, onClick: () => router.push(`/artist/${artistId}`) },
        // { name: 'Song details', icon: <BookAudio size={20} strokeWidth={1.75}/>, onClick: () => setIsSongMenuOpen(true) },
        { name: 'Listen on Spotify', icon: <FaSpotify size={20}/>, onClick: () => router.push(`https://open.spotify.com/track/${songId}`) },
    ].filter(action => action);

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

                document.body.style.overflowY = 'hidden';
        } else {
            setSelectedMenu(null);
            setIsSongMenuOpen(false);
            document.body.style.overflowY = 'auto';
        }
    }, [isSongMenuOpen, chartRank, songName, songArtist, songCover, popularity, releaseDate, releaseType, songAlbum])

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
                                <button className='action' name='action' onClick={action?.onClick}>
                                    <span className="song-text">{action?.name}</span>
                                    {action?.icon}
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