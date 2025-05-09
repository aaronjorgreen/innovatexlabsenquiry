import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="min-h-screen antialiased text-white bg-black">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;