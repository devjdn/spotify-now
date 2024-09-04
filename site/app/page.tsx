import Image from 'next/image';
import TopSongs from '@/public/top-songs.png';
import NewDropsGrid from '@/public/new-drops-grid.png';
import NewMusicFriday from '@/public/new-music-friday.png';
import FeaturedPlaylists from '@/public/featured-playlists.png';
import FeaturedPlaylistsId from '@/public/featured-playlist-id-page.png';



export default function Home() {

  const features = [
    {
      title: 'View the top songs right now', 
      subtitle: "Stay in the loop with the hottest tracks worldwide by exploring the current top songs. Our feature connects you to Spotify's Global Top 50, offering a real-time snapshot of the most popular music around the globe.", 
      images: [
        {
          image: <Image src={TopSongs} alt='Image of the top songs feature'/>,
          description: 'The top songs, as well as all playlist based features, are listed in a streaming service playlist-style format for easier viewing. They are updated automatically daily via the Spotify API',
        }
      ]
    },
    {
      title: 'See all the newest releases', 
      subtitle: "Be the first to hear the latest music with our 'New Drops' feature. Explore fresh tracks and albums as they drop, including the latest from Spotify's 'New Music Friday' playlist, ensuring you're always up to date with the newest hits and emerging artists.",
      images: [
        {
          image: <Image src={NewDropsGrid} alt='Image of the new drops grid feature'/>,
          description: 'Newest singles and albums over a recent period are displayed in a grid format with relevant information.',
        },
        {
          image: <Image src={NewMusicFriday} alt='Image of the new music friday feature'/>,
          description: '',
        }
      ]
    },
    {
      title: 'Featured playlists from Spotify themselves', 
      subtitle: "Discover Spotify's handpicked playlists right within our app, featuring expertly curated collections from Spotify themselves. Whether you're looking for the latest hits, mood-based mixes, or genre-specific compilations, these featured playlists bring the best of Spotify's music selection directly to you, updated regularly for fresh listening experiences.",
      images: [
        {
          image: <Image src={FeaturedPlaylists} alt='Image of the  feature'/>,
          description: 'You can see all the Spotify Featured Playlists in a clean grid format, as well as their relevant information. As well as this, you can also click the icon to the right to open them externally.',
        },
        {
          image: <Image src={FeaturedPlaylistsId} alt='Image of the  feature'/>,
          description: '',
        },
      ]
    },
  ]
  return (
    <main className="home-main">
      <section className="intro">
        <h1>Stay up to date with music on Spotify.</h1>
      </section>
      <section className="site-features">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature">
              <div className="feature-intro">
                <h2>{feature.title}</h2>
                <p>{feature.subtitle}</p>
              </div>
              <div className='feature-imgs'>
                {feature.images.map((image, imageIndex) => (
                  <div key={imageIndex} className="img-card">
                    {image.image}
                    <p>{image.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
