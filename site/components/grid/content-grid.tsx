import { Playlist, Album, Artist, ArtistTopTracks, ArtistRelatedArtists, Track, Lyrics, PlaylistTracks } from "@/lib/global";
import Link from "next/link";
import Image from "next/image";
import PreviewSongBtn from "../buttons/song-preview";
import { SongActionsBtn } from "../buttons/song-action-btns";
import { ArtistAlbums } from "../artist-albums";
import ContentHeader from "./content-header";
import ContentGridList from "./content-grid-list";

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
        const playlistTracks = fetchPlaylistTracks && (await fetchPlaylistTracks());
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
                            <ContentGridList
                                contentType="playlist"
                                imageUrl={item.track.album.images[2].url}
                                trackId={item.track.id}
                                trackName={item.track.name}
                                artistId={item.track.artists[0].id}
                                artistName={item.track.artists.map(name => name.name).join(', ')}
                                albumId={item.track.album.id}
                                albumName={item.track.album.name}
                                key={trackIndex}
                                duration={item.track.duration_ms}
                                previewUrl={item.track.preview_url}
                                popularity={item.track.popularity}
                                releaseType={item.track.album.type}
                                releaseDate={item.track.album.release_date}
                            />
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
                        <ContentGridList
                            contentType="album"
                            imageUrl={album.images[2].url}
                            trackNumber={item.track_number}
                            trackId={item.id}
                            trackName={item.name}
                            key={trackIndex}
                            duration={item.duration_ms}
                            previewUrl={item.preview_url}
                            popularity={album.popularity}
                            releaseType={album.type}
                            releaseDate={album.release_date}
                        />
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
        const topTracks = fetchTopTracks && (await fetchTopTracks());

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
                            <ContentGridList
                                contentType="playlist"
                                imageUrl={track.album.images[2].url}
                                trackId={track.id}
                                trackName={track.name}
                                artistId={track.artists[0].id}
                                artistName={track.artists.map(name => name.name).join(', ')}
                                albumId={track.album.id}
                                albumName={track.album.name}
                                key={trackIndex}
                                duration={track.duration_ms}
                                previewUrl={track.preview_url}
                                popularity={track.popularity}
                                releaseType={track.album.type}
                                releaseDate={track.album.release_date}
                            />
                        ))}
                    </ul>
                </div>
                {/* <ArtistAlbums artistId={artist.id} artistName={artist.name}/> */}
            </section>
        );
    };

    const renderTrack = async (track: Track, fetchLyrics?: () => Promise<Lyrics>) => {
        const lyrics = fetchLyrics && (await fetchLyrics());

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
