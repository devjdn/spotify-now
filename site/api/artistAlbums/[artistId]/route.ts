import { getSpotifyAccessToken } from "@/api/access-token";

export const fetchArtistAlbums = async ({artistId}: {artistId: string}) => {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Failed to fetch artist albums: ${response.status} ${errorBody}`);
        throw new Error(`Failed to fetch artist albums: ${response.status} ${errorBody}`);
    }
    const data = await response.json();
    return data;
}