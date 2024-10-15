import { fetchArtistProfile, fetchArtistPopularTracks } from "@/api/artist/[artistId]/route";
import { Artist, ArtistTopTracks } from "@/lib/global";
import { FaSpotify } from 'react-icons/fa';
import Link from "next/link";
import Image from "next/image";
import { ArtistAlbums } from "@/components/album-grid/artist-albums";
import { SongActionsBtn } from "@/components/buttons/song-action-btns";
import PreviewSongBtn from "@/components/playlist-grid/song-preview";
import { RelatedArtists } from "@/components/related-artists";

export default async function ArtistPage({params}: {params: {artistId: string;}}) {
    const { artistId } = params;
    const artist: Artist = await fetchArtistProfile({artistId});
    const topTracks: ArtistTopTracks = await fetchArtistPopularTracks({artistId});

    return(
        <section className="content artist">
            <header className="content-header">
                <div className="cover-art">
                    <Image fill priority src={artist.images[0].url} alt={artist.name}/>
                </div>
                <div className="content-info">
                    <h1>{artist.name}</h1>
                    <div className="info">
                        <h2>{artist.followers.total} followers</h2>
                    </div>
                    <div className="info">
                        <h3>Genres</h3>
                        {artist.genres.map((genre, genreIndex) => (
                            <p className="capitalize" key={genreIndex}>{genre}</p>
                        ))}
                    </div>
                    <div className="content-actions">
                        <Link href={artist.external_urls.spotify}>
                            <button className="action-btn">
                                Listen on
                                <FaSpotify/>
                            </button>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="grid-container">
                <h3 className="mb-[20px]">Popular releases</h3>
                <ul className="grid-ul">
                    {topTracks.tracks.map((track, trackIndex) => (
                        <li key={trackIndex} className="grid-li">
                            <div className="grid-col">
                                <div className="song-media">
                                    <img loading="lazy" src={track.album.images[0]?.url} alt={track.name} />
                                    <PreviewSongBtn previewUrl={track.preview_url}/>
                                </div>
                              <div className="info">
                                <a href={`/track/${track.id}`}>
                                    <span className="song-text">{track.name}</span>
                                </a>
                                <a href={`/artist/${track.artists[0]?.id}`}>
                                    <span className="song-text">{track.artists[0]?.name}</span>
                                </a>
                              </div>
                            </div>
                            <div className="grid-col">
                                <Link href={`/album/${track.album.id}`}>
                                    <span className="song-text">{track.album.name}</span>
                                </Link>
                            </div>
                            <div className="grid-col">
                              <span className="song-text">{formatDuration(track.duration_ms)}</span>
                            </div>
                            <div className="grid-col">
                                <SongActionsBtn songArtist={track.artists[0]?.name} songCover={track.album.images[0]?.url} songId={track.id} artistId={track.artists[0].id} songName={track.name} songAlbum={track.album.name} releaseType={track.type} popularity={track.popularity} albumId={track.album.id} releaseDate={track.album.release_date}/>
                            </div>
                         </li>
                    ))}
                </ul>
            </div>
            <ArtistAlbums artistId={artist.id} artistName={artist.name}/>
            <RelatedArtists artistId={artist.id} artistName={artist.name}/>
        </section>
    );
}

function formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
