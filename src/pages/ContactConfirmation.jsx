import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContactConfirmation = () => {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <h1 className="font-dancing text-5xl md:text-6xl mb-4">Thank You!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Your message has been sent successfully.
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              I appreciate you taking the time to reach out. I typically respond to inquiries within 24-48 hours. 
              I look forward to connecting with you about my artwork.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              to="/gallery" 
              className="inline-block bg-artist-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-artist-700 transition-colors mr-4"
            >
              View Gallery
            </Link>
            <Link 
              to="/" 
              className="inline-block border border-artist-600 text-artist-600 py-3 px-6 rounded-md font-semibold hover:bg-artist-50 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactConfirmation;