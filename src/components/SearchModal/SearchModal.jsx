'use client';

import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// const trendingKeywords = ['Summer Dresses', 'Men Jackets', 'Sneakers', 'Sunglasses'];

const SearchModal = ({ isOpen, onClose, type = 'popular' }) => {
  const [loading, setLoading] = useState(false);
  const [bsData, setBSData] = useState([]);
  const [error, setError] = useState(false);
  const [searchType, setSearchType] = useState('product'); // product | category
  const [query, setQuery] = useState('');
  const router = useRouter()

  useEffect(() => {
    if (!isOpen) return; // Avoid fetching when modal is closed

    const fetchBSProducts = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/product/products?type=${type}&quantity=4`
        );
        if (response.ok) {
          const data = await response.json();
          setBSData(data || []);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBSProducts();
  }, [isOpen, type]);

  const handleClick = (slug) => {
    router.push(`/shop/${slug}`);
    onClose();
  }

  const handleSearch = () => {
    if (!query.trim()) return;

    // redirect with params
    router.push(`/shop?search=${encodeURIComponent(query)}&type=${searchType}`);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed inset-0 z-60 bg-white flex flex-col p-8 overflow-y-auto"
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search Input + Dropdown Wrapper */}
              <div className="relative md:col-span-9">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Search ${searchType === 'product' ? 'products' : 'categories'}...`}
                  className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg"
                />

                {/* <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="px-3 py-4 border border-gray-300 rounded-full text-sm focus:outline-none cursor-pointer absolute right-1 top-1"
                >
                  <option value="product">Products</option>
                  <option value="category">Categories</option>
                </select> */}
              </div>

              {/* Search Button */}
              <div className="md:col-span-3 flex justify-center md:justify-start">
                <button
                  onClick={handleSearch}
                  className="w-full md:w-auto px-6 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition flex items-center justify-center gap-2"
                >
                  <Search size={18} />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>


            {/* Trending Keywords */}
            {/* <div className="mb-10 p-5">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">
                Trending Searches
              </h4>
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
            </div> */}

            {/* Popular Products */}
            <div className='p-5'>
              <h4 className="text-sm font-semibold text-gray-500 mb-4">
                Popular Products
              </h4>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Array(4)
                    .fill(null)
                    .map((_, idx) => (
                      <div key={idx} className="flex items-center gap-4 animate-pulse">
                        <div className="w-16 h-16 rounded bg-gray-200"></div>
                        <div className="flex flex-col gap-2">
                          <div className="w-24 h-3 bg-gray-200 rounded"></div>
                          <div className="w-16 h-3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : error ? (
                <p className="text-red-500">Failed to load products.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {bsData.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded overflow-hidden bg-gray-100">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${item.productImages[0].image}`}
                          alt={item.productName}
                          width={100}
                          height={100}
                          onClick={() => handleClick(item.productSlug)}
                          className="object-cover w-full h- cursor-pointer"
                        />
                      </div>
                      <div>
                        <h5 className="text-sm font-medium cursor-pointer" onClick={() => handleClick(item.productSlug)}>{item.productName.slice(0, 15)}</h5>
                        <p className="text-sm text-gray-500">{item.productPrice} {process.env.NEXT_PUBLIC_CURRENCY}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
