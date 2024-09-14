import { getSpotifyAccessToken } from "../access-token";

export const fetchAlbum = async ({albumId}: {albumId: string}) => {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Failed to fetch album tracks: ${response.status} ${errorBody}`);
        throw new Error(`Failed to fetch album tracks: ${response.status} ${errorBody}`);
    }
    const data = await response.json();
    return data;
}