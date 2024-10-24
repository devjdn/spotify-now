interface AccessProps {
    refresh_token: string;
    access_token: string;
    expires_in: number;
}

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

export const getSpotifyAccessToken = async (): Promise<string> => {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials'
            }),
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch access token: ${response.status} ${errorBody}`);
        }

        const data: AccessProps = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
};

let tokenCache: {
    accessToken: string;
    expiresAt: number;
} | null = null;

export const getCachedAccessToken = async (): Promise<string> => {
    // Check if we have a cached token that's still valid
    if (tokenCache && tokenCache.expiresAt > Date.now()) {
        return tokenCache.accessToken;
    }

    // If no valid token exists, get a new one
    try {
        const accessToken = await getSpotifyAccessToken();
        
        // Cache the new token with expiration (default expires_in is 3600 seconds)
        // Subtract 60 seconds as a buffer
        tokenCache = {
            accessToken,
            expiresAt: Date.now() + (3600 - 60) * 1000
        };

        return accessToken;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
};