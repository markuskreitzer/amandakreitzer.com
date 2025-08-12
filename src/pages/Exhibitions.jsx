import { motion } from 'framer-motion';
import GalleryGrid from '../components/Gallery/GalleryGrid';
import { exhibitions } from '../data/artworks';

const Exhibitions = () => {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-dancing text-5xl md:text-6xl mb-4">Exhibitions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Past and upcoming exhibitions showcasing the evolution of artistic vision
          </p>
        </motion.div>
        
        <div className="space-y-16">
          {exhibitions.map((exhibition, index) => (
            <motion.div
              key={exhibition.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="font-dancing text-3xl md:text-4xl mb-2">{exhibition.title}</h2>
                  <div className="text-gray-600 space-y-1">
                    <p className="font-semibold">{exhibition.venue}</p>
                    <p>{exhibition.location}</p>
                    <p>{exhibition.date}</p>
                  </div>
                  {exhibition.description && (
                    <p className="text-gray-600 mt-4">{exhibition.description}</p>
                  )}
                </div>
                
                {exhibition.images && exhibition.images.length > 0 && (
                  <GalleryGrid artworks={exhibition.images} />
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {exhibitions.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Exhibition information is being updated. Please check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exhibitions;