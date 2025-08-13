import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import GalleryGrid from '../components/Gallery/GalleryGrid';
import { loadCollectionsData } from '../data/artworks';

const Home = () => {
  // Featured artworks for slideshow (using some of the most striking pieces)
  const slideshowImages = [
    '/artworks/67/image.webp', // Latona and the Rooster (latest)
    '/artworks/17/image.webp', // Serendipity — Bontebok Ridge
    '/artworks/15/image.webp', // Siblings Forever
    '/artworks/28/image.webp', // Stroll
    '/artworks/46/image.webp', // Tea Time Reverie
    '/artworks/56/image.webp', // The Giant From Jersey
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % slideshowImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [slideshowImages.length]);

  useEffect(() => {
    const loadFeaturedArtworks = async () => {
      try {
        const collections = await loadCollectionsData();
        setFeaturedArtworks(collections.featured || []);
      } catch (error) {
        console.error('Failed to load featured artworks:', error);
        setFeaturedArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedArtworks();
  }, []);

  return (
    <div>
      {/* Hero Section with Slideshow */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Slideshow Background */}
        {slideshowImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-dancing text-6xl md:text-8xl mb-6"
          >
            Amanda Kreitzer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-light mb-8"
          >
            Romantic Realist • Oil Painter
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/gallery"
              className="inline-block bg-white text-gray-900 px-8 py-3 font-sans font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors"
            >
              View Gallery
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-dancing text-4xl md:text-5xl mb-4">Featured Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore a curated selection of recent paintings that showcase the evolving style and vision
            </p>
          </motion.div>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading featured works...</p>
            </div>
          ) : (
            <GalleryGrid artworks={featuredArtworks} />
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-block bg-artist-600 text-white px-8 py-3 font-sans font-semibold uppercase tracking-wider hover:bg-artist-700 transition-colors"
            >
              View All Works
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-dancing text-4xl md:text-5xl mb-6">About the Artist</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Amanda Kreitzer is an artist whose work explores the intersection of nature 
                and human experience. Through her paintings, she captures fleeting moments of beauty 
                and contemplation.
              </p>
              <Link
                to="/about"
                className="inline-block text-artist-600 font-semibold hover:text-artist-700 transition-colors"
              >
                Read More →
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/artworks/amanda/image.webp"
                alt="Amanda Kreitzer"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;