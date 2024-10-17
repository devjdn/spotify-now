import { getSpotifyAccessToken } from '@/api/access-token';
import SidebarContent from './sidebar-content';

export default async function Sidebar() {
    const accessToken = await getSpotifyAccessToken();

    return (
        <div className="sidebar-wrapper">
            <SidebarContent accessToken={accessToken}/>
        </div>
    );
}