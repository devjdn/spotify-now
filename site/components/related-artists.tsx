import { ArtistRelatedArtists } from "@/lib/global";
import { ScrollBtns } from "./buttons/scroll-btns";
import Link from "next/link";
import { fetchRelatedArtists } from "@/api/artist/[artistId]/route";

interface RelatedArtistProps {
    artistId: string;
    artistName: string;
}

export const RelatedArtists = async ({artistId, artistName}: RelatedArtistProps) => {
    const relatedArtists: ArtistRelatedArtists = await fetchRelatedArtists({artistId});

    return(
        <div className="related-artists">
            <header className="related-artists-header">
                <h3>Artists similar to {artistName}</h3>
                <ScrollBtns scrollTargetSelector="ul.related-artists-ul"/>
            </header>
            <div className="related-artists-scroll">
                <div className="scroll-shadow left"></div>
                <div className="scroll-shadow right"></div>
                <ul className="related-artists-ul">
                    {relatedArtists.artists.map((artist, artistIndex) => (
                        <li className="related-artists-li" key={artistIndex}>
                            <img src={artist.images[0].url} alt={artist.name}/>
                            <div className="info">
                                <Link href={`/artist/${artist.id}`}>
                                    <strong>{artist.name}</strong>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}