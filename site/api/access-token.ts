export const getSpotifyAccessToken = async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID; // Ensure these are set correctly
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to fetch accessToken: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    return data.access_token;
};
