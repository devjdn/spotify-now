export interface Album {
    id: string;
    name: string;
    album_type: string;
    external_urls: { 
        spotify: string; 
    }
    images: { 
        url: string; 
    }[];
    artists: { 
        name: string; 
        external_urls: { 
            spotify: string; 
        }
    }[];
}

export interface FeaturedPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  name: string;
  owner: {
    id: string;
    display_name: string;
  };
  tracks: {
    total: number;
  };
  uri: string;
}

export interface Playlist {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: string | null;
  track: {
    preview_url: string | null;
    available_markets: string[];
    explicit: boolean;
    type: string;
    episode: boolean;
    track: boolean;
    album: {
      available_markets: string[];
      type: string;
      album_type: string;
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      uri: string;
      artists: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      external_urls: {
        spotify: string;
      };
      total_tracks: number;
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    disc_number: number;
    track_number: number;
    duration_ms: number;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    popularity: number;
    uri: string;
    is_local: boolean;
  };
  video_thumbnail: {
    url: string | null;
  };
}

  