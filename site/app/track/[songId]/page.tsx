import { fetchTrack } from '@/api/song/[songId]/route';
import  { fetchLyrics } from '@/api/lyrics/[trackName]/route';
import { Lyrics, Track } from '@/lib/global';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';

interface SongProps {
    songName: string;
    songArtist: string;
    params: {
        songId: string;
    };
}

export default async function Song ({params, songName, songArtist}: SongProps) {
    const { songId } = params;
    const track: Track = await fetchTrack({songId});
    const lyrics: Lyrics = await fetchLyrics({songName, songArtist});
    return(
        <section className="content track">
            <header className="content-header">
                <img src={track.album.images[0].url} alt={track.name}/>
                <div className="content-info">
                    <h3>{track.name}</h3>
                    <span className="song-text">{track.artists[0].name}</span>
                    <div className="content-actions">
                        <Link href={track.external_urls.spotify}>
                            <button className="action-btn">
                                Listen on
                                <FaSpotify/>
                            </button>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="song-lyrics">
                <h3>Lyrics</h3>
                <div className="lyrics">
                    {lyrics ? (
                        lyrics.message.body.lyrics.lyrics_body.split('\n').map((line, lineIndex) => (
                            <div className="line" key={lineIndex}>
                                <strong>{line}</strong>
                                <br />
                            </div>
                        ))
                    ) : (
                        <p className="empty">No lyrics found</p>
                    )}
                </div>
            </div>
        </section>
    )
}