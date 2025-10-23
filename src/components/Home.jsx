import React, { useState, useEffect } from "react";
import Features from "./Features";

const images = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-ice py-12">
      {/* Page Top Title */}
      <div className="text-center px-4 max-w-2xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-deepBlue">
          E-LIBRARY MANAGEMENT SYSTEM
        </h1>
        <p className="mt-2 text-grayish text-base md:text-lg">
          Empowering Smart and Modern Library Experiences
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-4xl h-[450px] overflow-hidden rounded-xl shadow-sm border-4 border-sky">
        <img
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-1000"
        />

        {/* Explore Now Button */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <button className="bg-aqua text-white px-6 py-2 rounded-full font-semibold shadow-sm hover:bg-tealish transition-all transform hover:scale-105">
            Explore Now
          </button>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Features Section */}
      <div className="w-full mt-12">
        <Features />
      </div>
    </main>
  );
};

export default Home;
