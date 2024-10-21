let cachedAccessToken: string | null = null;
let tokenExpiryTime: number | null = null;

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;

export const getSpotifyAccessToken = async () => {
    const now = Date.now();
    
    // Check if the token is still valid
    if (cachedAccessToken && tokenExpiryTime && now < tokenExpiryTime) {
        console.log('Returning cached token');
        return cachedAccessToken;
    }

    console.log('Fetching new access token');
    
    const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }),
        cache: 'no-cache',
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to fetch accessToken: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    
    cachedAccessToken = data.access_token;
    tokenExpiryTime = now + (data.expires_in * 1000) - (60 * 1000); // expires_in is in seconds

    console.log('New token fetched:', cachedAccessToken);
    console.log('Token expiry time:', new Date(tokenExpiryTime).toISOString());

    return cachedAccessToken!;
};
