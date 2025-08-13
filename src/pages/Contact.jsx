import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Purchase inquiry',
    message: ''
  });

  const RECAPTCHA_SITE_KEY = '6LcLifEZAAAAADKfIJsRnfEc2BTrSmJK_pIKtK50';

  // Load reCAPTCHA script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      document.head.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // reCAPTCHA token generation (matching original Mailbox implementation)
  const getRecaptchaToken = () => {
    return new Promise((resolve) => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
            action: 'amandakreitzer_1'
          }).then((token) => {
            resolve(token);
          });
        });
      } else {
        // If reCAPTCHA fails to load, resolve with empty token
        resolve('');
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Get reCAPTCHA token first (matching original flow)
      const recaptchaToken = await getRecaptchaToken();
      
      // Prepare form data for backend (matching original Mailbox format)
      const formPayload = new FormData();
      
      // Add form fields with exact names from original form
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      if (formData.phone) {
        formPayload.append('phone', formData.phone);
      }
      formPayload.append('subject', formData.subject);
      formPayload.append('message', formData.message);
      
      // Add required fields for backend processing (matching original)
      formPayload.append('id', 'amandakreitzer_1');
      formPayload.append('token', recaptchaToken);
      
      console.log('Submitting form data:');
      for (let [key, value] of formPayload.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      // Submit to backend (use proxy in development, direct URL in production)
      const endpoint = import.meta.env.DEV ? '/api/forms/' : 'https://forms.cygnul.com/';
      const response = await fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        body: formPayload
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Response data:', result);
        if (result.responseCode === 0) {
          // Success - reset form and redirect
          setFormData({ name: '', email: '', phone: '', subject: 'Purchase inquiry', message: '' });
          navigate('/contact/confirmation');
        } else {
          // Backend returned an error
          console.error('Form submission failed:', result);
          alert('Sorry, there was an error sending your message. Please try again.');
        }
      } else {
        const errorText = await response.text();
        console.error('HTTP error response:', errorText);
        throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-dancing text-5xl md:text-6xl mb-4">Contact</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Interested in commissioning a piece or learning more about available works? 
            I'd love to hear from you.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-sans text-2xl font-bold mb-6">Get in Touch</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-artist-500 focus:border-artist-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-artist-500 focus:border-artist-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-artist-500 focus:border-artist-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-artist-500 focus:border-artist-500"
                >
                  <option value="Purchase inquiry">Purchase inquiry</option>
                  <option value="Commission order">Commission order</option>
                  <option value="Shipping">Shipping</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-artist-500 focus:border-artist-500"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-artist-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-artist-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-sans text-xl font-bold mb-4">Studio Information</h3>
              <div className="space-y-2 text-gray-600">
                <p>Available for studio visits by appointment</p>
                <p>Commission work accepted</p>
                <p>Original paintings and prints available</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-sans text-xl font-bold mb-4">Response Time</h3>
              <p className="text-gray-600">
                I typically respond to inquiries within 24-48 hours. Thank you for your patience.
              </p>
            </div>
            
            <div>
              <h3 className="font-sans text-xl font-bold mb-4">Commission Process</h3>
              <div className="space-y-2 text-gray-600 text-sm">
                <p>• Initial consultation to discuss vision and requirements</p>
                <p>• Detailed proposal with timeline and pricing</p>
                <p>• Regular updates throughout the creation process</p>
                <p>• Professional delivery and installation available</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;