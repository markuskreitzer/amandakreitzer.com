import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-dancing text-5xl md:text-6xl mb-4">About Amanda</h1>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="/artworks/amanda/image.webp"
              alt="Amanda Kreitzer in her studio"
              className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-sans text-2xl font-bold mb-4">Artist Statement</h2>
              <p className="text-gray-600 leading-relaxed">
                My work explores the delicate balance between the natural world and human emotion. 
                Through color, texture, and form, I seek to capture moments of quiet contemplation 
                and the profound beauty found in everyday experiences.
              </p>
            </div>
            
            <div>
              <p className="text-gray-600 leading-relaxed">
                Each painting begins with observation—whether it's the way light filters through 
                leaves, the reflection of clouds on water, or the subtle expressions that cross 
                a face in moments of introspection. I work primarily in oils, drawn to their 
                ability to build depth and luminosity through layers.
              </p>
            </div>
            
            <div>
              <p className="text-gray-600 leading-relaxed">
                My process is both intuitive and deliberate, allowing the painting to evolve 
                organically while maintaining a clear vision of the emotional resonance I wish 
                to achieve. The result is work that invites viewers to pause and reflect on 
                their own relationship with the world around them.
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-2 gap-12"
        >
          <div>
            <h3 className="font-sans text-xl font-bold mb-4">Awards</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Wellington ATKV - Award for Cultural Contribution towards Wellington Community</li>
              <li>Wellington Rapportryers - Award for Journalistic Contribution towards Wellington Community</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans text-xl font-bold mb-4">Selected Exhibitions</h3>
            <ul className="space-y-2 text-gray-600">
              <li>2012 - Kleinevalleij, Wellington (opened by Schalk Burger Snr.)</li>
              <li>2009 - Simonsvlei Cellar, Paarl (opened by Trevor A. Cleevely)</li>
              <li>2005 - Museum, Wellington (opened by Basie Basson)</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;