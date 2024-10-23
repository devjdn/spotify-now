import { fetchTrack } from '@/api/song/[songId]/route';
import {  Playlist, Track } from '@/lib/global';
import ContentGrid from '@/components/grid/content-grid';
import { fetchLyrics } from '@/api/song/[songId]/route';

interface SongProps {
    params: {
        songId: string;
        songName: string;
        songArtist: string;
    };
}

export default async function Song ({params}: {params: Promise<{songId: string; songName: string; songArtist: string;}>}) {
    const { songId } = await params;
    const track: Track = await fetchTrack({songId});
    const songArtist = track.artists[0].name;
    const songName = track.name;

    const fetchData = async (): Promise<Playlist> => {
        return await fetchTrack({songId});
    };

    return(
        <ContentGrid fetchData={fetchData} data={track} contentType='track' fetchLyrics={() => fetchLyrics({songName, songArtist})}/>
    )
}