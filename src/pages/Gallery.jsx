import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import GalleryGrid from '../components/Gallery/GalleryGrid';
import { loadCollectionsData } from '../data/artworks';

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const collections = await loadCollectionsData();
        setArtworks(collections.all || []);
      } catch (error) {
        console.error('Failed to load gallery artworks:', error);
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    loadArtworks();
  }, []);

  if (loading) {
    return (
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Loading gallery...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-dancing text-5xl md:text-6xl mb-4">Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A collection of paintings exploring themes of nature, light, and human emotion
          </p>
        </motion.div>
        
        <GalleryGrid artworks={artworks} />
        
        {artworks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Gallery is being updated with new works. Please check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;