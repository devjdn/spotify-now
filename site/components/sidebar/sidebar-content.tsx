'use client';
import { useSidebar } from './sidebar-context';
import Link from 'next/link';
import Image from "next/image";
import SpotifyIcon from "@/public/Spotify_Icon_CMYK_Green.png";
import { Nav } from './nav';
import SpotifyLargeTextLogo from '@/public/Spotify_Logo_CMYK_Green.png';
import SidebarBtn from './sidebar-toggle';
import { FeaturedPlaylist } from '@/lib/global';

interface SidebarContentProps {
    featured: FeaturedPlaylist[];
}

export default function SidebarContent({featured}: SidebarContentProps) {
    const {isOpen} = useSidebar();

    return(
        <div className="sidebar" aria-expanded={isOpen}>
            <header className="sidebar-header">
                <Link href="/">
                    <span className="logo">
                        <Image width={28} height={28} priority src={SpotifyIcon} alt="Spotify icon logo in green" /> Now
                    </span>
                </Link>
                <SidebarBtn/>
            </header>
            <Nav featured={featured}/>
            <footer className="sidebar-footer">
                <span className='song-text'>All media via</span>
                <a href="https://open.spotify.com">
                    <Image priority={true} alt='Spotify large text logo' src={SpotifyLargeTextLogo} />
                </a>
            </footer>
        </div>
    );
}