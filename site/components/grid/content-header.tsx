import Image from 'next/image';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa6';

interface ContentHeaderProps {
    title: string;
    description?: string;
    genres?: string[];
    spotifyUrl: string;
    artist?: string;
    artistId?: string;
    popularity?: number;
    releaseDate?: string;
    contentType?: 'album' | 'playlist' | 'artist';
    imageUrl: string;

}

export default function ContentHeader ({title, description, genres, spotifyUrl, artist, artistId, popularity, releaseDate, imageUrl}: ContentHeaderProps) {
    return(
        <header className="content-header">
            <div className="cover-art">
                <Image fill priority src={imageUrl} alt={title} />
            </div>
            <div className="content-info">
                <div className="details-container">
                    <h3>{title}</h3>
                    {description && <p>{description}</p>}
                    {genres && <p className="capitalize">{genres.map(genre => genre).join(', ')}</p>}
                    {artist &&(
                        <Link href={`/artist/${artistId}`}>
                            <p>{artist}</p>
                        </Link>
                    )}
                </div>
                <div className="content-actions">
                    <Link href={spotifyUrl}>
                        <button className="action-btn">
                            Listen on <FaSpotify />
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}