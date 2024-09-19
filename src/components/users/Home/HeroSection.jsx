import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-blue-900 text-white py-20">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Car</h1>
        <p className="text-lg mb-8">Browse our selection of top-quality used cars and get the best deals.</p>
        <a href="/browseCars" className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600">View Inventory</a>
      </div>
    </section>
  );
};

export default HeroSection;
