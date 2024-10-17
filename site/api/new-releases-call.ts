import { getSpotifyAccessToken } from "./access-token";

export const fetchNewReleases = async () => {
    const accessToken = await getSpotifyAccessToken();

    const response = await fetch('https://api.spotify.com/v1/browse/new-releases?limit=36', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to fetch new music releases: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    return data.albums;
}