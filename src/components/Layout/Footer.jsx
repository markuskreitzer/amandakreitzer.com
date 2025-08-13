import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-dancing text-2xl mb-4 text-gray-900">Amanda Kreitzer</h3>
            <p className="text-gray-600 text-sm">
              Artist exploring themes of nature and humanity
            </p>
          </div>
          
          <div>
            <h4 className="font-sans font-semibold text-gray-900 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/gallery" className="text-gray-600 hover:text-artist-600 text-sm transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/exhibitions" className="text-gray-600 hover:text-artist-600 text-sm transition-colors">
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-artist-600 text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-artist-600 text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans font-semibold text-gray-900 mb-3">Connect</h4>
            <p className="text-gray-600 text-sm mb-2">
              For inquiries about artwork and exhibitions
            </p>
            <Link 
              to="/contact" 
              className="text-artist-600 hover:text-artist-700 text-sm font-semibold transition-colors"
            >
              Get in Touch →
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Amanda Kreitzer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;