'use client';

import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGrid, ChartNoAxesCombined, Home, Sparkles, Star, CalendarClock, Loader } from "lucide-react";
import { FeaturedPlaylist } from "@/lib/global";
import { fetchQuickPlaylistLinks } from "@/api/quick-playlist-links";
import { useSidebar } from "../contexts/sidebar-context";

interface NavProps {
    featured: FeaturedPlaylist[];
}

export function Nav({featured}: NavProps) {
    const pathname = usePathname();
    const router = useRouter();
    const {isOpen, toggleSidebar} = useSidebar();
    const [navLinks, setNavLinks] = useState([
        {
            group: 'Explore',
            links: [
                { name: 'Home', href: '/', icon: <Home size={22}/> },
                { name: 'Top Songs', href: '/top-songs', icon: <ChartNoAxesCombined size={22}/> },
                { name: 'New Music Friday', href: '/new-music-friday', icon: <CalendarClock size={22}/> },
            ],
        },
        {
            group: 'Quick Playlists',
            links: [],
        }
    ]);
    
    useEffect(() => {
        const featuredLinks = featured.map(pLink => ({
            name: pLink.name,
            href: `/playlist/${pLink.id}`,
            icon: <LayoutGrid size={22} />,
        }));
    
        setNavLinks(prevNavLinks => 
            prevNavLinks.map(navGroup => 
                navGroup.group === 'Quick Playlists' 
                    ? { ...navGroup, links: featuredLinks } 
                    : navGroup
            )
        );
    }, [featured]);

    return(
        <nav className="header-nav">
            {navLinks.map((linkGroup, linkIndex) => (
                <div className="nav-group"  key={linkIndex}>
                    <h4>{linkGroup.group}</h4>
                    <ul className="nav-ul">
                        {linkGroup.links.map((link, index) => (
                            <li className="nav-li" key={index}>
                                <Link href={link.href} onClick={toggleSidebar}>
                                    <button className={`nav-btn ${clsx(
                                    'hover:bg-neutral-200 dark:hover:bg-neutral-800',
                                    {'bg-neutral-200 dark:bg-neutral-800': link.href === pathname}
                                    )}`}>
                                        {link.icon}
                                        {link.name}
                                    </button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
}