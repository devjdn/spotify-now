'use client'

import { X } from 'lucide-react';

interface SongDetailsProps {
    songName: string;
    songArtist: string | undefined;
    songAlbum?: string;
    popularity: number;
    releaseDate: string;
    releaseType: string;
    songCover: string;
    chartRank?: number;
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
                        <div className="info">
                            <h3>{songName}</h3>
                            <span className="song-text">{songArtist}</span>
                        </div>
                        <button className="close-song-details-menu-btn" onClick={() => setIsSongMenuOpen(!isSongMenuOpen)}><X/></button>
                    </header>
                    <img src={songCover} alt={songName} />
                    <div className="song-details-info">
                        {chartRank && 
                            <div className="info">
                                <strong>Chart Rank</strong>
                                <span className="song-text">{chartRank}</span>
                            </div>  
                        }    
                        <div className="info">
                            <strong>Popularity Score</strong>
                            <span className="song-text">{popularity}</span>
                        </div>
                        <div className="info">
                            <strong>Album</strong>
                            <span className="song-text">{songAlbum}</span>
                        </div>
                        <div className="info">
                            <strong>Release Date</strong>
                            <span className="song-text">{releaseDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}