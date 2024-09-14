import { fetchAlbum } from "@/api/[albumId]/route";
import { Album } from "@/lib/global";
import AlbumGrid from "@/components/album-grid/album-grid";

export default async function AlbumPage({params}: {params: { albumId: string; }}) {
    const { albumId } = params;
    const album: Album = await fetchAlbum({ albumId });
  
    return <AlbumGrid album={album} fetchAlbum={() => fetchAlbum({ albumId })}></AlbumGrid>;
  }