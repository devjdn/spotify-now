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
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to fetch new music releases: ${response.status} ${errorBody}`);
    }

    const data = await response.json();
    return data.albums.items;
}

export const fetchFeaturedPlaylists = async () => {
    try {
        const accessToken = await getSpotifyAccessToken();

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
        console.log(data);
        return data.playlists.items;
    } catch (error) {
        console.error('Error in fetchFeaturedPlaylists:', error);
        throw error;
    }
}

export const fetchGlobalTop50 = async () => {
    try {
        const accessToken = await getSpotifyAccessToken();

        const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch top 50: ${response.status} ${errorBody}`)
        }

        const data = await response.json();
        console.log(data);
        return data.tracks.items;

    } catch (error) {
        console.error('Error in fetchGlobalTop50:', error);
        throw error;
    }
}

export const fetchNewMusicFriday = async () => {
    try {
        const accessToken = await getSpotifyAccessToken();

        const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DX4JAvHpjipBk', {
            headers : {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Failed to fetch top hits: ${response.status} ${errorBody}`);
        }

        const data = await response.json();
        console.log(data);
        return data.tracks.items;
    } catch (error) {
        console.error('Error in fetchNewMusicFriday:', error);
        throw error;
    }
}

export interface PlaylistProps {
    playlistId: string;
}
  
export const fetchPlaylistTracks = async ({ playlistId }: PlaylistProps) => {
    const accessToken = await getSpotifyAccessToken();
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to fetchPlaylistTracks: ${response.status} ${errorBody}`);
      }
  
      const data = await response.json();
      console.log(data);
      return data.items;
    } catch (error) {
      console.error('Error in fetchPlaylistTracks:', error);
      throw error;
    }
};