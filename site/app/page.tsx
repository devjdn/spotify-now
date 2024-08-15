import NewReleases from "@/components/spotify/new-releases";
import Image from "next/image";
import WeekndHero from "@/public/weeknd-hero.webp";

export default function Home() {
  return (
    <main className="home-main">
      <section className="intro">
        <Image layout="fill" src={WeekndHero} alt="Hero image of The Weeknd from his After Hours Til Dawn Tour"/>
        <div className="intro-text">
          <h1>No more gatekeeping your music</h1>
        </div>
      </section>
      <NewReleases/>
    </main>
  );
}
