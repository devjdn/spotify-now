import { Playlist, Album, Artist, ArtistTopTracks, ArtistRelatedArtists, Track, Lyrics, PlaylistTracks } from "@/lib/global";
import Link from "next/link";
import Image from "next/image";
import PreviewSongBtn from "../buttons/song-preview";
import { SongActionsBtn } from "../buttons/song-action-btns";
import { ArtistAlbums } from "../artist-albums";
import ContentHeader from "./content-header";

interface ContentGridProps {
    fetchData: () => Promise<Album | Playlist | Artist | Track>;
    fetchPlaylistTracks?: () => Promise<PlaylistTracks>;
    fetchTopTracks?: () => Promise<ArtistTopTracks>;
    fetchLyrics?: () => Promise<Lyrics>;
    data: Album | Playlist | Artist | Track;
    contentType: 'playlist' | 'album' | 'artist' | 'track';
}

const ContentGrid: React.FC<ContentGridProps> = async ({ fetchData, fetchTopTracks, contentType, fetchLyrics, fetchPlaylistTracks }) => {
    const content = await fetchData();

    const renderContent = () => {
        switch (contentType) {
            case 'playlist':
                return renderPlaylist(content as Playlist, fetchPlaylistTracks);
            case 'album':
                return renderAlbum(content as Album);
            case 'artist':
                return renderArtist(content as Artist, fetchTopTracks);
                case 'track':
                    return renderTrack(content as Track, fetchLyrics);
            default:
                return null;
        }
    }

    const renderPlaylist = async (playlist: Playlist, fetchPlaylistTracks?: () => Promise<PlaylistTracks>) => {
        const playlistTracks = fetchPlaylistTracks && await fetchPlaylistTracks();
        return(
            <section className={`content playlist`}>
                <ContentHeader title={playlist.name} description={playlist.description} spotifyUrl={playlist.external_urls.spotify} imageUrl={playlist.images[0].url}/>
                <div className="grid-container">
                    <header className="grid-header">
                        <div className="grid-col"><span className="song-text">Song</span></div>
                        <div className="grid-col"><span className="song-text">Album</span></div>
                        <div className="grid-col"><span className="song-text">Time</span></div>
                    </header>
                    <ul className="grid-ul">
                        {playlistTracks && playlistTracks.items.map((item, trackIndex) => (
                            <li className="grid-li" key={trackIndex}>
                                <div className="grid-col">
                                    <div className="song-media">
                                        <div className="artwork-container">
                                            <Image quality={50} fill loading="lazy" src={item.track.album.images[2].url} alt={item.track.name} />
                                        </div>
                                        <PreviewSongBtn previewUrl={item.track.preview_url} />
                                    </div>
                                    <div className="details-container">
                                        <span className="song-text"><Link href={`/track/${item.track.id}`}>{item.track.name}</Link></span>
                                        <span className="song-text"><Link href={`/artist/${item.track.artists[0].id}`}>{item.track.artists.map(name => name.name).join(', ')}</Link></span>
                                    </div>
                                </div>
                                <div className="grid-col">
                                    <div className="details-container">
                                        <span className="song-text"><Link href={`/album/${item.track.album.id}`}>{item.track.album.name}</Link></span>
                                    </div>
                                </div>
                                <div className="grid-col">
                                    <div className="duration">
                                        <span className="song-text">{formatDuration(item.track.duration_ms)}</span>
                                    </div>
                                    <SongActionsBtn songArtist={item.track.artists[0]?.name} songCover={item.track.album.images[0]?.url} songId={item.track.id} artistId={item.track.artists[0].id} songName={item.track.name} songAlbum={item.track.album.name} releaseType={item.track.type} popularity={item.track.popularity} albumId={item.track.album.id} releaseDate={item.track.album.release_date}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <footer className="content-footer">
                    <span className="song-text">{playlist.owner.display_name}</span>
                    {playlist.tracks.total === 1 ? 
                    <span className="song-text capitalize">{playlist.tracks.total} track</span> 
                    : 
                    <span className="song-text capitalize">{playlist.tracks.total} tracks</span>
                    }
                </footer>
            </section>
        );
    };

    const renderAlbum = (album: Album) => (
        <section className={`content album`}>
            <ContentHeader title={album.name} artist={album.artists[0].name} artistId={album.artists[0].id} spotifyUrl={album.external_urls.spotify} imageUrl={album.images[0].url}/>
            <div className="grid-container">
                <ul className="grid-ul">
                    {album.tracks.items.map((item, trackIndex) => (
                        <li className="grid-li" key={trackIndex}>
                            <div className="grid-col">
                                <div className="song-media">
                                    <PreviewSongBtn previewUrl={item.preview_url} />
                                    <div className="track-number">
                                        <span className="song-text">{item.track_number}</span>
                                    </div>
                                </div>
                                <div className="details-container">
                                    <span className="song-text"><Link href={`/track/${item.id}`}>{item.name}</Link></span>
                                </div>
                            </div>
                            <div className="grid-col">
                                <div className="duration">
                                    <span className="song-text">{formatDuration(item.duration_ms)}</span>
                                </div>
                                <SongActionsBtn songArtist={item.artists[0].name} songCover={album.images[0].url} songId={item.id} artistId={item.artists[0].id} songName={item.name} songAlbum={album.name} releaseType={item.type} popularity={album.popularity} releaseDate={album.release_date}/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <footer className="content-footer">
                <span className="song-text capitalize">{album.release_date}</span>
                {album.total_tracks === 1 ? <span className="song-text capitalize">{album.total_tracks} track</span> : <span className="song-text capitalize">{album.total_tracks} tracks</span>}
                <span className="song-text">{album.copyrights[0].text}</span>
                <span className="song-text">{album.label}</span>
            </footer>
        </section>
    );

    const renderArtist = async (artist: Artist, fetchTopTracks?: () => Promise<ArtistTopTracks>) => {
        const topTracks = fetchTopTracks && await fetchTopTracks();

        return(
            <section className={`content artist`}>
                <ContentHeader title={artist.name} genres={artist.genres} spotifyUrl={artist.external_urls.spotify} imageUrl={artist.images[0]?.url}/>
                <div className="grid-container">
                    <h3>Popular tracks</h3>
                    <header className="grid-header">
                        <div className="grid-col"><span className="song-text">Song</span></div>
                        <div className="grid-col"><span className="song-text">Album</span></div>
                        <div className="grid-col"><span className="song-text">Time</span></div>
                    </header>
                    <ul className="grid-ul">
                        {topTracks && topTracks.tracks.map((track, trackIndex) => (
                            <li className="grid-li" key={trackIndex}>
                                <div className="grid-col">
                                    <div className="song-media">
                                        <div className="artwork-container">
                                            <Image quality={50} fill loading="lazy" src={track.album.images[2].url} alt={track.name} />
                                        </div>
                                        <PreviewSongBtn previewUrl={track.preview_url} />
                                    </div>
                                    <div className="details-container">
                                        <span className="song-text"><Link href={`/track/${track.id}`}>{track.name}</Link></span>
                                        <span className="song-text"><Link href={`/artist/${track.artists[0].id}`}>{track.artists[0].name}</Link></span>
                                    </div>
                                </div>
                                <div className="grid-col">
                                    <div className="details-container">
                                        <span className="song-text"><Link href={`/album/${track.album.id}`}>{track.album.name}</Link></span>
                                    </div>
                                </div>
                                <div className="grid-col">
                                    <div className="duration">
                                        <span className="song-text">{formatDuration(track.duration_ms)}</span>
                                    </div>
                                    <SongActionsBtn songArtist={track.artists[0]?.name} songCover={track.album.images[0]?.url} songId={track.id} artistId={track.artists[0].id} songName={track.name} songAlbum={track.album.name} releaseType={track.type} popularity={track.popularity} albumId={track.album.id} releaseDate={track.album.release_date}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <ArtistAlbums artistId={artist.id} artistName={artist.name}/>
            </section>
        );
    };

    const renderTrack = async (track: Track, fetchLyrics?: () => Promise<Lyrics>) => {
        const lyrics = fetchLyrics && await fetchLyrics();

        return(
            <section className={`content track`}>
                <ContentHeader title={track.name} artist={track.artists[0].name} artistId={track.artists[0].id} spotifyUrl={track.external_urls.spotify} imageUrl={track.album.images[0].url}/>
                <div className="song-lyrics">
                    <h3>Lyrics</h3>
                    <div className="lyrics">
                        {lyrics ? (
                            lyrics.message.body.lyrics.lyrics_body.split('\n').slice(0, -2).map((line, lineIndex) => (
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
        );
    }

    return <>{renderContent()}</>
};

function formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


export default ContentGrid;
