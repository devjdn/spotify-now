import { getSpotifyAccessToken } from "./access-token";

interface PlaylistIdProps{
    playlistId: string;
}

export const fetchHighlightedPlaylist = async ({playlistId}: PlaylistIdProps) => {
    const accessToken = await getSpotifyAccessToken();

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to fetch top 50: ${response.status} ${errorBody}`)
    }

    const data = await response.json();
    return data;
}