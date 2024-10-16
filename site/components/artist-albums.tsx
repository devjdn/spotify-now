import { ArtistReleasedAlbums } from "@/lib/global";
import { fetchArtistAlbums } from "@/api/artistAlbums/[artistId]/route";
import { ScrollBtns } from "./buttons/scroll-btns";
import Link from "next/link";
import Image from "next/image";

interface ArtistAlbumProps {
    artistId: string;
    artistName: string;
}

export const ArtistAlbums = async ({artistId, artistName}: ArtistAlbumProps) => {
    const albums: ArtistReleasedAlbums = await fetchArtistAlbums({artistId});

    return(
        <div className="featured-content">
            <header className="featured-content-header">
                <h3>More By {artistName}</h3>
                <ScrollBtns scrollTargetSelector="ul.featured-content-ul"/>
            </header>
            <div className="featured-content-scroll">
                <div className="scroll-shadow left"></div>
                <div className="scroll-shadow right"></div>
                <ul className="featured-content-ul">
                    {albums.items.map((album, albumIndex) => (
                        <li className="featured-content-li" key={albumIndex}>
                            <div className="artwork-container">
                                <Image loading="lazy" fill src={album.images[0].url} alt={album.name}/>
                            </div>
                            <div className="details-container">
                                <span className="song-text"><Link href={`/album/${album.id}`}>{album.name}</Link></span>
                                <span className="song-text"><Link href={`/artist/${artistId}`}>{album.artists[0].name}</Link></span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}