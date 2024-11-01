import Image from 'next/image';
import Link from 'next/link';
import { Album, PlaylistTracks } from '@/lib/global';
import PreviewSongBtn from '../buttons/song-preview';
import { SongActionsBtn } from '../buttons/song-action-btns';

interface GridListProps {
    contentType: 'album' | 'playlist';
    imageUrl: string;
    previewUrl?: string;
    trackName: string;
    trackNumber?: number;
    trackId: string;
    artistId?: string
    artistName?: string;
    albumId?: string;
    albumName?: string;
    duration: number;
    popularity: number;
    releaseType: string;
    releaseDate: string;
}

export default async function ContentGridList({contentType, imageUrl, trackId, trackName, trackNumber, artistId, artistName, previewUrl, albumId, albumName, duration, releaseDate, releaseType, popularity}: GridListProps) {

    return(
        <li className="grid-li">
            <div className="grid-col">
                <div className="song-media">
                    {contentType === 'playlist' ? (
                        <div className="artwork-container">
                            <Image quality={50} fill loading="lazy" src={imageUrl} alt={trackName} />
                        </div>
                    ) : (
                        <div className="track-number">
                            <span className="song-text">{trackNumber}</span>
                        </div>
                    )}
                    <PreviewSongBtn previewUrl={previewUrl} />
                </div>
                <div className="details-container">
                    <span className="song-text"><Link href={`/track/${trackId}`}>{trackName}</Link></span>
                    {contentType === 'playlist' && (
                        <span className="song-text">
                            <Link href={`/artist/${artistId}`}>{artistName}</Link>
                        </span>
                    )}
                </div>
            </div>
            {contentType === 'playlist' && (
                <div className="grid-col">
                    <div className="details-container">
                        <span className="song-text"><Link href={`/album/${albumId}`}>{albumName}</Link></span>
                    </div>
                </div>
            )}
            <div className="grid-col">
                <div className="duration">
                    <span className="song-text">{formatDuration(duration)}</span>
                </div>
                {contentType === 'playlist' ? (
                    <SongActionsBtn
                        songArtist={artistName}
                        songCover={imageUrl}
                        songId={trackId}
                        artistId={artistId}
                        songName={trackName}
                        songAlbum={albumName}
                        releaseType={releaseType}
                        popularity={popularity}
                        albumId={albumId}
                        releaseDate={releaseDate}
                    />
                ):(
                    <SongActionsBtn
                        songArtist={artistName}
                        songCover={imageUrl}
                        songId={trackId}
                        artistId={artistId}
                        songName={trackName}
                        songAlbum={albumName}
                        releaseType={releaseType}
                        popularity={popularity}
                        releaseDate={releaseDate}
                    />
                )}
            </div>
        </li>
    );
}

function formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}