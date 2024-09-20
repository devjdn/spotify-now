'use client';

import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Top Songs', href: '/top-songs' },
    { name: 'New Drops', href: '/new-drops' },
    { name: 'Featured Playlists', href: '/featured-playlists' },
];

export function HeaderNav() {
    const pathname = usePathname();

    return(
        <nav className="header-nav">
            <ul className="nav-ul">
                {navLinks.map((link, linkIndex) => (
                    <li key={linkIndex} className="nav-li">
                        <Link href={link.href} className={clsx(
                            'text-neutral-500',
                            {'text-white': link.href === pathname}
                        )}>
                        {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export function DirectionalNav() {
    const pathname = usePathname();
    const router = useRouter();
    const currentPage = navLinks.find((link) => link.href === pathname);
    const linkName = currentPage ? currentPage.name : 'Album/Single/Playlist';

    return(
        <div className="directional-nav">
            <div className="link-name">
                <h3>{linkName}</h3>
            </div>
            <div className="page-turn-btns">
                <button className="page-back-btn" onClick={() => router.back()}><ChevronLeft/></button>
                <button className="page-forward-btn" onClick={() => router.forward()}><ChevronRight/></button>
            </div>
        </div>
    );
}

export function FooterNav() {
    const pathname = usePathname();

    return(
        <nav className="footer-nav">
            <ul className="nav-ul">
                {navLinks.map((link, linkIndex) => (
                    <li key={linkIndex} className="nav-li">
                        <Link href={link.href} className={clsx(
                            'text-neutral-500',
                            {'text-white': link.href === pathname}
                        )}>
                        {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export function MobileHeaderNav({ isOpen }: { isOpen: boolean }) {
    const pathname = usePathname();

    return(
        <div className="mobile-header-nav-wrapper" aria-expanded={isOpen}>
            <nav className="mobile-header-nav">
                <ul className="nav-ul">
                    {navLinks.map((link, linkIndex) => (
                        <li key={linkIndex} className="nav-li">
                            <Link href={link.href} className={clsx(
                                'text-neutral-500',
                                {'text-white': link.href === pathname}
                            )}>
                            {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}