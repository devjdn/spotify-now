import SearchMenu from "./search-bar";
import Image from "next/image";
import SpotifyIcon from "@/public/Spotify_Icon_CMYK_Green.png";

export default function Header() {
  return(
    <header className="global-header">
      <a href="/">
        <span className="logo">
          <Image width={36} src={SpotifyIcon} alt="Spotify icon logo in green"/>Now
        </span>
      </a>
      
      <SearchMenu/>
    </header>
  );
}