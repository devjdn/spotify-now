import { SidebarProvider } from './sidebar-context';
import { fetchQuickPlaylistLinks } from '@/api/quick-playlist-links';
import { FeaturedPlaylist } from '@/lib/global';
import SidebarContent from './sidebar-content';

export default async function Sidebar() {
    const featured: FeaturedPlaylist[] = await fetchQuickPlaylistLinks();

    return (
        <SidebarProvider>
            <SidebarContent featured={featured}/>
        </SidebarProvider>
    );
}