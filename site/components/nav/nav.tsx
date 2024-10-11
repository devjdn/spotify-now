import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGrid, ChartNoAxesCombined, Home, Sparkles, Star, CalendarClock, Loader } from "lucide-react";
import { FeaturedPlaylist } from "@/lib/global";
import { fetchQuickPlaylistLinks } from "@/api/quick-playlist-links";

interface NavProps {
    accessToken: string;
    toggleMobileNav: () => void;
}

export function Nav({accessToken, toggleMobileNav}: NavProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [navLinks, setNavLinks] = useState([
        {
            group: 'Explore',
            links: [
                { name: 'Home', href: '/', icon: <Home size={22}/> },
                { name: 'Top Songs', href: '/top-songs', icon: <ChartNoAxesCombined size={22}/> },
                { name: 'New Music Friday', href: '/new-music-friday', icon: <CalendarClock size={22}/> },
                { name: 'Featured Playlists', href: '/featured-playlists', icon: <Star size={22}/> },
                { name: 'New Drops', href: '/new-drops', icon: <Sparkles size={22}/> },
            ],
        },
        {
            group: 'Quick Playlists',
            links: [],
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    
    useEffect(() => {
        const quickPlaylistNav = async () => {

            try{
                const featured: FeaturedPlaylist[] = await fetchQuickPlaylistLinks({accessToken});
    
                const featuredLinks = featured.slice(0, 6).map(pLink => ({
                    name: pLink.name,
                    href: `/featured-playlists/${pLink.id}`,
                    icon: <LayoutGrid size={22} />,
                }));
            
                setNavLinks(prevNavLinks => 
                    prevNavLinks.map(navGroup => 
                        navGroup.group === 'Quick Playlists' 
                            ? { ...navGroup, links: featuredLinks } 
                            : navGroup
                    )
                );
            } catch (error) {
                console.error('Error fetching quick playlist links:', error);
            }
        };

        quickPlaylistNav();
    }, [accessToken]);

    return(
        <nav className="header-nav">
            {navLinks.map((linkGroup, linkIndex) => (
                <div className="nav-group"  key={linkIndex}>
                    <h4>{linkGroup.group}</h4>
                    <ul className="nav-ul">
                            {linkGroup.links.map((link, index) => (
                                <li className="nav-li" key={index}>
                                    <button onClick={() => {router.push(`${link.href}`); toggleMobileNav()}} className={`nav-btn ${clsx(
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