'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: '/Image/Copilot_20250825_121802.png',
    title: 'Next Gen',
    subtitle: 'Sharp Style',
    tag: 'Daily Tech',
  },
  {
    image: '/Image/Copilot_20250825_122111.png',
    title: 'Everyday Essential',
    subtitle: 'Simple Style',
    tag: 'Daily Comfort',
  },
  {
    image: '/Image/Copilot_20250825_122406.png',
    title: 'Beauty Style',
    subtitle: 'Modern Look',
    tag: 'Chic Vibes',
  },
  {
    image: '/Image/Copilot_20250825_123122.png',
    title: 'Home Kitchen',
    subtitle: 'Fresh Vibe',
    tag: 'Cook Easy',
  },
];

export const TopBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full h-screen lg:h-[40rem] relative overflow-hidden">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="flex-shrink-0 w-full h-full relative">
            <Image
              src={slide.image}
              alt={`Slide ${idx}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-start px-8 lg:px-24">
              <div
                className={`text-white max-w-xl space-y-4 transition-opacity duration-700 ease-in-out ${currentIndex === idx ? "opacity-100" : "opacity-0"
                  }`}
              >
                <p className="text-sm tracking-wide uppercase">{slide.tag}</p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {slide.title}
                  <br />
                  {slide.subtitle}
                </h1>
                <button className="mt-4 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">
                  Shop Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-md"
      >
        <ChevronLeft />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-md"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 w-full flex justify-center items-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-white scale-110" : "bg-gray-400"
              }`}
          ></button>
        ))}
      </div>
    </div>

  );
};
