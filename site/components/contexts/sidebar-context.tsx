'use client';

import { createContext, useCallback, useContext, useState } from 'react';

interface SidebarContextProps {
    isOpen: boolean;
    toggleMobileSidebar: () => void;
    sidebarMode: 'full' | 'minimized';
    toggleSidebarMode: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if(!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

export const SidebarProvider = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sidebarMode, setSidebarMode] = useState<'full' | 'minimized'>('full');

    const toggleMobileSidebar = useCallback(() => {
        if (window.innerWidth < 669) {
            setIsOpen(prev => !prev);
            document.body.style.overflowY = isOpen ? 'auto' : 'hidden';
        }
    }, [isOpen]);

    const toggleSidebarMode = useCallback(() => {
            setSidebarMode((prevMode) => (prevMode === 'full' ? 'minimized' : 'full'));
    },[sidebarMode])

    return(
        <SidebarContext.Provider value={{isOpen, toggleMobileSidebar, sidebarMode, toggleSidebarMode}}>
            {children}
        </SidebarContext.Provider>
    );
};