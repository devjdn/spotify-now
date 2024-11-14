'use client';

import { useSidebar } from '@/components/contexts/sidebar-context';
import { BsWindowSidebar } from 'react-icons/bs';

export default function SidebarModeToggle(){
    const {sidebarMode, toggleSidebarMode} = useSidebar();

    return(
        <button className='sidebar-mode-toggle' onClick={toggleSidebarMode}>
            <BsWindowSidebar size={22} strokeWidth={0.25}/>
        </button>
    );
}