import { fetchArtistProfile, fetchArtistPopularTracks } from "@/api/artist/[artistId]/route";
import { Album, Artist, ArtistRelatedArtists, ArtistTopTracks } from "@/lib/global";
import ContentGrid from "@/components/grid/content-grid";

export default async function ArtistPage({params}: {params: Promise<{artistId: string;}>}) {
    const { artistId } = await params;
    const artist: Artist = await fetchArtistProfile({artistId});

    const fetchData = async (): Promise<Album> => {
        return await fetchArtistProfile({artistId});
    };

    return(
        <ContentGrid fetchData={fetchData} data={artist} contentType="artist" fetchTopTracks={() => fetchArtistPopularTracks({artistId})}/>
    );
}