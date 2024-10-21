import { getSpotifyAccessToken } from "../../access-token";

export const fetchPlaylist = async ({ playlistId }: { playlistId: string }) => {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Failed to fetch playlist: ${response.status} ${errorBody}`);
        throw new Error(`Failed to fetch playlist: ${response.status} ${errorBody}`);
    }
    const data = await response.json();
    return data;
};

export const fetchPlaylistTracks = async ({playlistId}: {playlistId: string}) => {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Failed to fetch playlist: ${response.status} ${errorBody}`);
        throw new Error(`Failed to fetch playlist: ${response.status} ${errorBody}`);
    }
    const data = await response.json();
    return data;
}