import React from 'react';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Gallery />
    </div>
  );
};

export default Home;