const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

export const getSpotifyAccessToken = async (): Promise<string> => {
    const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        })
    });

    if (!response.ok) {
        throw new Error('Unable to get access token');
    }

    const data = await response.json();
    return data.access_token;
}

export const fetchNewReleases = async () => {
    const accessToken = await getSpotifyAccessToken();

    const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch new music releases');
    }

    const data = await response.json();
    return data.albums.items;
}