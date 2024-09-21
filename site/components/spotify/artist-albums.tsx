import { ArtistReleasedAlbums } from "@/lib/global";
import { fetchArtistAlbums } from "@/api/artistAlbums/[artistId]/route";

interface ArtistAlbumProps {
    artistId: string;
    artistName: string;
}

export const ArtistAlbums = async ({artistId, artistName}: ArtistAlbumProps) => {
    const albums: ArtistReleasedAlbums = await fetchArtistAlbums({artistId});

    return(
        <div className="featured-content">
            <h3>More from {artistName}</h3>
            <div className="featured-content-scroll">
                <div className="scroll-shadow left"></div>
                    <div className="scroll-shadow right"></div>
                    <ul className="featured-content-ul">
                        <div className="scroll-shadow left"></div>
                        <div className="scroll-shadow right"></div>
                        {albums.items.map((album, albumIndex) => (
                            <li className="featured-content-li" key={albumIndex}>
                                <img src={album.images[0].url} alt={album.name}/>
                                <div className="info">
                                    <a href={`/album/${album.id}`}>
                                        <strong>{album.name}</strong>
                                    </a>
                                    <p>{album.artists[0].name}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
            </div>
        </div>
    );
}