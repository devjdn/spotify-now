'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import SpotifyIcon from "@/public/Spotify_Icon_CMYK_Green.png";
import { Nav } from './nav/nav';
import { MenuIcon } from 'lucide-react';


export default function Sidebar({accessToken}: {accessToken: string;}) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleMobileNav = () => {
        setIsExpanded(!isExpanded);

        if(isExpanded === false) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }

    return(
        <div className="sidebar" aria-expanded={isExpanded}>
            <header className="sidebar-header">
                <Link href="/">
                  <span className="logo">
                    <Image width={28} height={28} priority src={SpotifyIcon} alt="Spotify icon logo in green"/>Now
                  </span>
                </Link>
                <button className='mobile-nav-expander' onClick={toggleMobileNav}>
                    <MenuIcon/>
                </button>
            </header>
            <Nav accessToken={accessToken}/>
        </div>
    );
}