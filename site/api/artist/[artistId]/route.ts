import { getSpotifyAccessToken } from "@/api/access-token";

interface ArtistProps {
    artistId: string;
}

export const fetchArtistProfile = async ({artistId}: ArtistProps) => {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    if(!response.ok) {
        const errorBody = await response.text();
        console.error(`Error fetching Artist profile: ${response.status} ${response.statusText} ${errorBody}`);
        throw new Error(`Error fetching Artist profile: ${response.status} ${response.statusText} ${errorBody}`)
    }

    const data = await response.json();
    return data;
}

export const fetchArtistPopularTracks = async ({artistId}: ArtistProps) => {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })
    if(!response.ok) {
        const errorBody = await response.text();
        console.error(`Error fetching Artist's top tracks: ${response.status} ${response.statusText} ${errorBody}`);
        throw new Error(`Error fetching Artist's top tracks: ${response.status} ${response.statusText} ${errorBody}`);
    }
    const data = await response.json();
    return data;
}

export const fetchRelatedArtists = async ({artistId}: ArtistProps) => {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    if(!response.ok) {
        const errorBody = await response.text();
        console.error(`Error fetching Artist's related artists: ${response.status} ${response.statusText} ${errorBody}`);
        throw new Error(`Error fetching Artist's related artists: ${response.status} ${response.statusText} ${errorBody}`)
    }
    const data = await response.json();
    return data;
}