import { fetchArtistProfile } from "@/api/artist/[artistId]/route";
import { Artist } from "@/lib/global";
import { FaSpotify } from 'react-icons/fa';

export default async function ArtistPage({params}: {params: {artistId: string;}}) {
    const { artistId } = params;
    const artist: Artist = await fetchArtistProfile({artistId});
    return(
        <section className="content artist">
            <header className="content-header">
                <img src={artist.images[0].url} alt={artist.name} />
                <div className="content-info">
                    <h1>{artist.name}</h1>
                    <p className="song-text">{artist.followers.total} followers</p>
                    <div className="content-actions">
                        <a href={artist.external_urls.spotify}>
                            <button className="action-btn">
                                Listen on
                                <FaSpotify/>
                            </button>
                        </a>
                    </div>
                </div>
            </header>
        </section>
    );
}