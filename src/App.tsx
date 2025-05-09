import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen antialiased text-white bg-black">
      <Navbar />
      <Hero />
      <Services />
      <Testimonials />
      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default App;