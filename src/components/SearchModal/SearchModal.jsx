'use client';

import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const trendingKeywords = ['Summer Dresses', 'Men Jackets', 'Sneakers', 'Sunglasses'];

const popularProducts = [
  {
    id: 1,
    title: 'Minimalist Sneakers',
    price: '$79.99',
    image: '/Image/fs_new_s1.webp',
  },
  {
    id: 2,
    title: 'Classic Denim Jacket',
    price: '$119.00',
    image: '/Image/fs_new_s1.webp',
  },
  {
    id: 3,
    title: 'Modern Turtleneck',
    price: '$59.99',
    image: '/Image/fs_new_s1.webp',
  },
  {
    id: 4,
    title: 'Casual Cotton Shirt',
    price: '$49.00',
    image: '/Image/fs_new_s1.webp',
  },
];

const SearchModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed inset-0 z-50 bg-white flex flex-col p-8 overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-black"
          >
            <X size={24} />
          </button>

          {/* Search Content */}
          <div className="w-full max-w-2xl mx-auto mt-20">
            <h2 className="text-3xl font-bold mb-6 text-center">Search</h2>
            <input
              type="text"
              placeholder="Search products, categories..."
              className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg mb-6"
            />

            {/* Trending Keywords */}
            <div className="mb-10">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">Trending Searches</h4>
              <div className="flex flex-wrap gap-3">
                {trendingKeywords.map((keyword, idx) => (
                  <button
                    key={idx}
                    className="px-4 py-2 text-sm bg-gray-100 rounded-full hover:bg-black hover:text-white transition"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Products */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-4">Popular Products</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {popularProducts.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">{item.title}</h5>
                      <p className="text-sm text-gray-500">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
