'use client';

import { useSidebar } from '@/components/contexts/sidebar-context';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SidebarModeToggle(){
    const {sidebarMode, toggleSidebarMode} = useSidebar();

    return(
        <button className='sidebar-mode-toggle' onClick={toggleSidebarMode}>
            {sidebarMode === 'full' ? <ArrowLeft size={22}/> : <ArrowRight size={22}/>}
        </button>
    );
}