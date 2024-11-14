'use client';

import { Equal, X } from 'lucide-react';
import { useSidebar } from '../../contexts/sidebar-context';

export default function MobileSidebarToggle() {
    const {isOpen, toggleMobileSidebar} = useSidebar();

    return(
        <button className='mobile-sidebar-toggle' onClick={toggleMobileSidebar}>
            {isOpen ? <X/> : <Equal/>}
        </button>
    );
}