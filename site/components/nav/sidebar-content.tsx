'use client';

import { useEffect, useState } from 'react';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";
import SpotifyIcon from "@/public/Spotify_Icon_CMYK_Green.png";
import { Nav } from './nav';
import SpotifyLargeTextLogo from '@/public/Spotify_Logo_CMYK_Green.png';
import { getSpotifyAccessToken } from '@/api/access-token';

export default function SidebarContent({accessToken}: {accessToken: string}) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleMobileNav = () => {
        if (window.innerWidth < 669) {
            setIsExpanded(prev => !prev);
            document.body.style.overflowY = isExpanded ? 'auto' : 'hidden';
        }
    };

    return (
        <div className="sidebar" aria-expanded={isExpanded}>
            <header className="sidebar-header">
                <Link href="/">
                    <span className="logo">
                        <Image width={28} height={28} priority src={SpotifyIcon} alt="Spotify icon logo in green" /> Now
                    </span>
                </Link>
                <button className='mobile-nav-expander' onClick={toggleMobileNav}>
                    <MenuIcon/>
                </button>
            </header>
            <Nav accessToken={accessToken} toggleMobileNav={toggleMobileNav} />
            <footer className="sidebar-footer">
                <span className='song-text'>All media via</span>
                <a href="https://open.spotify.com">
                    <Image priority={true} alt='Spotify large text logo' src={SpotifyLargeTextLogo} />
                </a>
            </footer>
        </div>
    );
}