'use client';

import { useState } from 'react';
import Image from "next/image";
import SpotifyIcon from "@/public/Spotify_Icon_CMYK_Green.png";
import { Nav, MobileHeaderNav } from "../nav/nav";
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  }

  return(
    <>
    <header className="global-header">
      <Link href="/">
        <span className="logo">
          <Image width={36} src={SpotifyIcon} alt="Spotify icon logo in green"/>Now
        </span>
      </Link>

      <Nav/>

      <button className="mobile-header-nav-btn" onClick={toggleNav} aria-expanded={isOpen}>
        {isOpen ? (
          <X/>
        ) : (
          <Menu/>
        )}
      </button>
    </header>

    <MobileHeaderNav isOpen={isOpen}/>
    </>
  );
}