import { SidebarProvider } from '../contexts/sidebar-context';
import SidebarContent from './sidebar-content';

export default async function Sidebar() {

    return (
        <SidebarProvider>
            <SidebarContent/>
        </SidebarProvider>
    );
}