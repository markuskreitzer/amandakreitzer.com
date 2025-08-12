import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';

const GalleryModal = ({ artwork, isOpen, onClose, allArtworks }) => {
  const [currentIndex, setCurrentIndex] = useState(
    allArtworks.findIndex(a => a.id === artwork.id)
  );

  const currentArtwork = allArtworks[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') navigatePrev();
      if (e.key === 'ArrowRight') navigateNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const navigatePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? allArtworks.length - 1 : prev - 1));
  };

  const navigateNext = () => {
    setCurrentIndex((prev) => (prev === allArtworks.length - 1 ? 0 : prev + 1));
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50"
                onClick={onClose}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              >
                <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center pointer-events-auto">
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Navigation buttons */}
                  <button
                    onClick={(e) => { e.stopPropagation(); navigatePrev(); }}
                    className="absolute left-4 z-10 text-white hover:text-gray-300 transition-colors"
                    aria-label="Previous"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); navigateNext(); }}
                    className="absolute right-4 z-10 text-white hover:text-gray-300 transition-colors"
                    aria-label="Next"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Image and details */}
                  <div className="flex flex-col lg:flex-row gap-6 items-center">
                    <div className="flex-1 max-h-[80vh]">
                      <img
                        src={currentArtwork.image}
                        alt={currentArtwork.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="lg:w-80 text-white p-6 lg:p-0">
                      <h2 className="text-2xl font-bold mb-2">{currentArtwork.title}</h2>
                      <p className="text-lg mb-4">{currentArtwork.year}</p>
                      {currentArtwork.medium && (
                        <p className="text-sm text-gray-300 mb-2">{currentArtwork.medium}</p>
                      )}
                      {currentArtwork.dimensions && (
                        <p className="text-sm text-gray-300 mb-4">{currentArtwork.dimensions}</p>
                      )}
                      {currentArtwork.description && (
                        <p className="text-sm text-gray-300">{currentArtwork.description}</p>
                      )}
                      {currentArtwork.available && (
                        <p className="mt-4 text-sm text-green-400">Available for purchase</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default GalleryModal;