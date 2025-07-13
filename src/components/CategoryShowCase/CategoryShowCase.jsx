'use client'
import Image from 'next/image';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

// Reusable hero banner data array
const banners = [
  {
    title: 'Colour Spotlight',
    subtitle: 'SAVE 30–50% BLAZERS',
    image: '/Image/fs_new_s1.webp',
  },
  {
    title: 'Confident Looks',
    subtitle: 'LIMITED TIME ONLY',
    image:'/Image/fs_new_s1.webp',
  },
];

export default function CategoryShowCase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveIndex((prev) => (prev + 1) % banners.length),
    onSwipedRight: () => setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <section className="py-12 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {banners.map((banner, index) => (
            <BannerCard key={index} banner={banner} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative" {...handlers}>
          <BannerCard banner={banners[activeIndex]} />

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {banners.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'bg-black' : 'bg-gray-400'
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Single banner card component (reusable)
function BannerCard({ banner }) {
  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden group shadow-md">
      {/* Background image */}
      <Image
        src={banner.image}
        alt={banner.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 bg-black/50 bg-opacity-30 flex flex-col justify-center items-center text-center text-white px-4">
        <p className="text-xs tracking-widest mb-1 uppercase">
          {banner.subtitle}
        </p>
        <h2 className="text-2xl font-semibold mb-4">{banner.title}</h2>
        <button className="bg-white text-black text-sm font-medium px-5 py-2 rounded-full shadow-md hover:bg-gray-100 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
}
