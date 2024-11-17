'use client';
import { useSidebar } from '../contexts/sidebar-context';
import Link from 'next/link';
import Image from "next/image";
import SpotifyIcon from "@/public/Spotify_Icon_CMYK_Green.png";
import { Nav } from './nav/nav';
import SpotifyLargeTextLogo from '@/public/Spotify_Logo_CMYK_Green.png';
import MobileSidebarToggle from './sidebar-buttons/mobile-sidebar-toggle';
import { FeaturedPlaylist } from '@/lib/global';
import SidebarModeToggle from './sidebar-buttons/sidebar-mode-toggle';

interface SidebarContentProps {
    featured: FeaturedPlaylist[];
}

export default function SidebarContent({featured}: SidebarContentProps) {
    const {isOpen, sidebarMode} = useSidebar();

    return(
        <div className="sidebar" aria-expanded={isOpen} data-sidebar-mode={sidebarMode}>
            <header className="sidebar-header">
                {sidebarMode === 'full' ? (
                    <Link href="/">
                        <span className="logo">
                            <Image width={28} height={28} priority src={SpotifyIcon} alt="Spotify icon logo in green" /> Now
                        </span>
                    </Link>
                ) : null}
                <MobileSidebarToggle/>
                <SidebarModeToggle/>
            </header>
            <Nav featured={featured}/>
        </div>
    );
}