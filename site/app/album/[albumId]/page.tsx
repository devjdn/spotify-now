import { fetchAlbum } from "@/api/album/[albumId]/route";
import { Album } from "@/lib/global";
import ContentGrid from "@/components/grid/content-grid";

export default async function AlbumPage({params}: {params: Promise<{ albumId: string; }>}) {
    const { albumId } = await params;
    const album: Album = await fetchAlbum({ albumId });

    const fetchData = async (): Promise<Album> => {
      return await fetchAlbum({ albumId });
    };
  
    return(
      <ContentGrid fetchData={fetchData} data={album} contentType='album'/>
    );
  }