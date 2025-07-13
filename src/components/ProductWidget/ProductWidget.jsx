'use client';
import Image from 'next/image';
import React from 'react';

// DRY category array
const categories = [
  { name: 'Demin', image: '/Image/main_clt4.webp' },
  { name: 'Blazers', image: '/Image/main_clt4.webp' },
  { name: 'Crop-top', image: '/Image/main_clt4.webp' },
  { name: 'Sweaters', image: '/Image/main_clt4.webp'},
  { name: 'T-Shirts', image: '/Image/main_clt4.webp' },
];

const ProductWidget = () => {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Shop By Category
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Express your style with our standout collection—fashion meets sophistication.
        </p>
      </div>

      {/* Scrollable on small, grid on md+ */}
      <div className="md:grid md:grid-cols-5 gap-6 overflow-x-auto flex md:flex-none space-x-4 md:space-x-0 no-scrollbar snap-x snap-mandatory">
        {categories.map((category, index) => (
          <div
            key={index}
            className="min-w-[70%] sm:min-w-[40%] md:min-w-0 flex-shrink-0 md:flex-shrink snap-center flex flex-col items-center text-center"
          >
            {/* Image */}
            <div className="w-full overflow-hidden rounded-xl">
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={400}
                className="object-cover w-full h-auto transition-transform duration-300 hover:scale-105"
              />
            </div>
            {/* Name */}
            <p className="mt-3 font-semibold text-lg text-gray-900">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductWidget;
