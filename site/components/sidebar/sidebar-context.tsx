'use client';

import { createContext, useCallback, useContext, useState } from 'react';

interface SidebarContextProps {
    isOpen: boolean;
    toggleSidebar: () => void;
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

    const toggleSidebar = useCallback(() => {
        if (window.innerWidth < 669) {
            setIsOpen(prev => !prev);
            document.body.style.overflowY = isOpen ? 'auto' : 'hidden';
        }
    }, []);

    return(
        <SidebarContext.Provider value={{isOpen, toggleSidebar}}>
            {children}
        </SidebarContext.Provider>
    );
};