import React, { useState } from 'react';
import { motion } from './animations/Motion';
import { Send } from 'lucide-react';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Simulate a successful submission
    console.log('Newsletter subscription:', email);
    setIsSubmitted(true);
    setEmail('');
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated with Innovation</h2>
          <p className="text-white/80 mb-8">
            Subscribe to our newsletter to receive the latest insights, trends, and innovations in technology.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="flex-grow">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border focus:outline-none focus:ring-2 ${
                  error ? 'border-red-300 focus:ring-red-400' : 'border-white/30 focus:ring-white/50'
                } placeholder-white/60 text-white`}
              />
              {error && <p className="mt-2 text-left text-red-200 text-sm">{error}</p>}
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center"
            >
              Subscribe <Send size={16} className="ml-2" />
            </button>
          </form>
          
          {isSubmitted && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-white bg-white/10 backdrop-blur-sm p-2 rounded"
            >
              Thank you for subscribing! We'll keep you updated.
            </motion.p>
          )}
          
          <p className="text-xs mt-4 text-white/70">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;