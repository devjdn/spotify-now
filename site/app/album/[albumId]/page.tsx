import { fetchAlbum } from "@/api/album/[albumId]/route";
import { Album } from "@/lib/global";
import AlbumGrid from "@/components/album-grid/album-grid";
import ContentGrid from "@/components/grid/content-grid";

export default async function AlbumPage({params}: {params: { albumId: string; }}) {
    const { albumId } = params;
    const album: Album = await fetchAlbum({ albumId });

    const fetchData = async (): Promise<Album> => {
      return await fetchAlbum({ albumId });
    };
  
    return(
      <ContentGrid fetchData={fetchData} data={album} contentType='album'/>
    );
  }