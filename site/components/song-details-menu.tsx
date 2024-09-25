'use client'

import { X } from 'lucide-react';

interface SongDetailsProps {
    songName: string;
    songArtist: string;
    songAlbum: string;
    popularity: number;
    releaseDate: string;
    releaseType: string;
    songCover: string;
    chartRank: number;
    setIsSongMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSongMenuOpen: boolean;
}

export const SongDetailsMenu = ({ setIsSongMenuOpen, isSongMenuOpen, chartRank, songArtist, songName, songCover, songAlbum, popularity, releaseType, releaseDate }: SongDetailsProps) => {
    return(
        <>
        {isSongMenuOpen &&
            <div className='song-details-menu-overlay' aria-expanded={isSongMenuOpen}>
                <div className="song-details-menu">
                    <header className="song-details-header">
                        <h1>{chartRank}</h1>
                        <button className="close-song-details-menu-btn" onClick={() => setIsSongMenuOpen(!isSongMenuOpen)}><X/></button>
                    </header>
                    <div className="song-details-menu-content">
                        <img src={songCover} alt={songName} />
                        <div className="info">
                            <h3>{songName}</h3>
                            <p className="song-text">{songArtist}</p>
                        </div>
                    </div>
                    <div className="song-details-menu-content">
                        <div className="info">
                            <strong>Popularity score</strong>
                            <p className="song-text">{popularity}</p>
                        </div>
                        <div className="info">
                            <strong>Album</strong>
                            <p className="song-text">{songAlbum}</p>
                        </div>
                        <div className="info">
                            <strong>Release date</strong>
                            <p className="song-text">{releaseDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}