'use client';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import React from 'react';

// DRY: Best selling product data
const products = [
  {
    id: 1,
    title: 'High neck jumper',
    price: 250,
    image: '/Image/main_clt4.webp' ,
    rating: 4,
    variants: ['#000000', '#d2d2d2'],
    badge: null,
    originalPrice: null,
    countdown: null,
  },
  {
    id: 2,
    title: 'Belted blazer dress',
    price: 300,
    image: '/Image/main_clt4.webp' ,
    rating: 5,
    variants: ['#000000', '#b9a07f'],
    badge: '-14%',
    originalPrice: 350,
    countdown: '247D : 11H : 52M : 37S',
  },
  {
    id: 3,
    title: 'Short sleeve T-shirt',
    price: 125,
    image: '/Image/main_clt4.webp' ,
    rating: 5,
    variants: ['#f5d5ce', '#d2d2d2'],
    badge: null,
    originalPrice: null,
    countdown: null,
  },
  {
    id: 4,
    title: 'Basic blazer',
    price: 225,
    image: '/Image/main_clt4.webp' ,
    rating: 4,
    variants: ['#0e0e1b', '#f2f2f2'],
    badge: 'Pre-Order',
    originalPrice: null,
    countdown: null,
  },
];

const BestSellingProducts = () => {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Best Selling</h2>
        <p className="text-gray-600 max-w-xl mx-auto mt-2">
          Unmatched design—superior performance and customer satisfaction in one.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group"
          >
            {/* Badge */}
            {product.badge && (
              <span
                className={`absolute top-4 z-50 left-4 text-xs font-semibold px-2 py-1 rounded ${
                  product.badge === 'Pre-Order'
                    ? 'bg-teal-600 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {product.badge}
              </span>
            )}

            {/* Wishlist Icon */}
            <button className="absolute top-4 z-50 right-4 text-gray-600 hover:text-black">
              <Heart className="w-5 h-5" />
            </button>

            {/* Product Image */}
            <div className="w-full overflow-hidden rounded-lg mb-4">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={400}
                className="object-cover w-full h-[340px] transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Countdown */}
            {product.countdown && (
              <div className="bg-red-600 text-white text-xs font-bold text-center py-1 rounded-md mb-2">
                {product.countdown}
              </div>
            )}

            {/* Title */}
            <h3 className="font-medium text-sm sm:text-base text-gray-900">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="text-yellow-500 text-sm mb-1">
              {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
            </div>

            {/* Pricing */}
            <div className="text-sm sm:text-base font-semibold text-gray-900">
              ${product.price.toFixed(2)}{' '}
              {product.originalPrice && (
                <span className="line-through text-gray-400 text-sm ml-1 font-normal">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Variants */}
            <div className="mt-2 flex items-center gap-2">
              {product.variants.map((color, i) => (
                <span
                  key={i}
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;