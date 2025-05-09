import React, { useState } from 'react';
import LeadForm from './LeadForm';
import { motion } from './animations/Motion';

const Hero: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmitSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <motion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
              Transform Your Ideas Into{' '}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Market-Leading Products
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We help innovative companies turn their boldest visions into reality with cutting-edge
              technology and strategic expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#services"
                className="px-8 py-3 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-all"
              >
                Our Services
              </a>
              <a
                href="#about"
                className="px-8 py-3 bg-transparent border border-orange-500/30 text-white font-medium rounded-full hover:bg-orange-500/10 transition-all"
              >
                Learn More
              </a>
            </div>
          </motion>

          <motion
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-black/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-orange-500/20 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Get Started Today</h2>
              {showSuccessMessage ? (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-white">
                  <p className="text-center">
                    Thank you for submitting your form! We've received your information and will be in touch with next steps.
                  </p>
                </div>
              ) : (
                <LeadForm onSubmitSuccess={handleSubmitSuccess} />
              )}
            </div>
          </motion>
        </div>
      </div>
    </section>
  );
};

export default Hero;