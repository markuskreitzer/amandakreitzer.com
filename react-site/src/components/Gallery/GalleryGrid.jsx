import { useState } from 'react';
import { motion } from 'framer-motion';
import GalleryModal from './GalleryModal';

const GalleryGrid = ({ artworks }) => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedArtwork(null), 300);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => openModal(artwork)}
          >
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                src={artwork.thumbnail || artwork.image}
                alt={artwork.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold">{artwork.title}</h3>
                  <p className="text-sm opacity-90">{artwork.year}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedArtwork && (
        <GalleryModal
          artwork={selectedArtwork}
          isOpen={modalOpen}
          onClose={closeModal}
          allArtworks={artworks}
        />
      )}
    </>
  );
};

export default GalleryGrid;