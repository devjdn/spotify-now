'use client';

import { Equal, X } from 'lucide-react';
import { useSidebar } from './sidebar-context';

export default function SidebarToggle() {
    const {isOpen, toggleSidebar} = useSidebar();

    return(
        <button className='sidebar-toggle' onClick={toggleSidebar}>
            {isOpen ? <X/> : <Equal/>}
        </button>
    );
}