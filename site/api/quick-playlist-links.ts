import { getSpotifyAccessToken } from "./access-token";

export const fetchQuickPlaylistLinks = async () => {
    const accessToken = await getSpotifyAccessToken();

    const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists?limit=10', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to fetch featured playlists: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    return data.playlists.items;
}