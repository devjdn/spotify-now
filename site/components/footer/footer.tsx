import Image from "next/image";
import SpotifyLogo from "@/public/Spotify_Logo_CMYK_Green.png";
import { FooterNav } from "../nav/nav";

export default function Footer() {
    return(
        <footer className="global-footer">
            <div className="powered-by">
                <strong>Powered by</strong>
                <a href="https://spotify.com" target="_blank">
                    <Image height={60} src={SpotifyLogo} alt="Spotify text logo in green"/>
                </a>
            </div>

            <FooterNav/>
        </footer>
    );
}