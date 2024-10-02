import { getSpotifyAccessToken } from "@/api/access-token";

export const fetchTrack = async ({songId}: {songId: string}) => {
    const accessToken = await getSpotifyAccessToken();

    const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Error fetching track: ${response.status} ${response.statusText} ${errorBody}`);
        throw new Error(`Error fetching track: ${response.status} ${response.statusText} ${errorBody}`);
    }

    const data = await response.json();
    return data;
}