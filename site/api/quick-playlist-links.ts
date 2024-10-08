export const fetchQuickPlaylistLinks = async ({accessToken}: {accessToken: string;}) => {

    const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
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