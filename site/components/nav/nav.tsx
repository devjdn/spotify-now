'use client';

import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AudioWaveform, ChartNoAxesColumnIncreasing, ChartNoAxesCombined, Home, Sparkles, Star } from "lucide-react";
import { getSpotifyAccessToken } from "@/api/access-token";
import { fetchFeaturedPlaylists } from "@/api/featured-playlists-call";

export function Nav() {
    const pathname = usePathname();
    const router = useRouter();

    const navLinks = [
        {
            group: 'Explore',
            links: [
                { name: 'Home', href: '/', icon: <Home size={22}/> },
                { name: 'Top Songs', href: '/top-songs', icon: <ChartNoAxesCombined size={22}/> },
                { name: 'New Drops', href: '/new-drops', icon: <Sparkles size={22}/> },
                { name: 'Featured Playlists', href: '/featured-playlists', icon: <Star size={22}/> },
            ],
        },
        {
            group: 'Quick Playlists',
            links: [
                { name: "Today's Top Hits", href: '/featured-playlists/37i9dQZF1DXcBWIGoYBM5M', icon: <AudioWaveform size={22}/> },
                { name: "All Out 80s", href: '/featured-playlists/37i9dQZF1DX4UtSsGT1Sbe', icon: <AudioWaveform size={22}/> },
                { name: 'Home', href: '/featured-playlists', icon: <AudioWaveform size={22}/>},
                { name: 'Home', href: '/featured-playlists', icon: <AudioWaveform size={22}/> },
                { name: 'Home', href: '/featured-playlists', icon: <AudioWaveform size={22}/> },
                { name: 'Home', href: '/featured-playlists', icon: <AudioWaveform size={22}/> },
            ]
        }
    ];

    useEffect(() => {
        const quickPlaylistNav = async () => {
            const accessToken = await getSpotifyAccessToken();
            const featured = await fetchFeaturedPlaylists();
        }
    }, []);

    return(
        <nav className="header-nav">
            {navLinks.map((linkGroup, linkIndex) => (
                <div className="nav-group"  key={linkIndex}>
                    <h4>{linkGroup.group}</h4>
                    <ul className="nav-ul">
                        {linkGroup.links.map((link, index) => (
                            <li className="nav-li" key={index}>
                                <button onClick={() => router.push(`${link.href}`)} className={`nav-btn ${clsx(
                                    'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                                    {'bg-neutral-100 dark:bg-neutral-800': link.href === pathname}
                                )}`}>
                                    {link.icon}
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
}