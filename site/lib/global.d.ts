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

export interface Playlist {
    id: string;
    name: string;
    collaborative: boolean;
    href: string;
    owner: {
        external_urls: {
            spotify: string;
        },
        display_name: string;
    }[];
    description: string;
    external_urls: {
        spotify: string;
    }
    images: {
        url: string;
    }[];
}

export interface Top50 {
    id: number;
    track: {
        album: {
            album_type: string;
            total_tracks: number;
            available_markets: string[];
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
            release_date: string;
            release_date_precision: string;
            restrictions?: {
              reason: string;
            };
            type: string;
            uri: string;
            artists: Array<{
              external_urls: {
                spotify: string;
              };
              href: string;
              id: string;
              name: string;
              type: string;
              uri: string;
            }>;
        };
        artists: Array<{
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }>;
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: {
          isrc: string;
          ean: string;
          upc: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from?: object; // Linked from is an empty object, but you can define its structure if needed
        restrictions?: {
          reason: string;
        };
        name: string;
        popularity: number;
        preview_url: string;
        track_number: number;
        type: string;
        uri: string;
        is_local: boolean;
    }
};
  