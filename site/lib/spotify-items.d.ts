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