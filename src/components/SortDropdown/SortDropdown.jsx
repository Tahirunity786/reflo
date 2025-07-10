'use client'; 

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Sort");

  const sortOptions = [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
  ];

  // Handle sort selection
  const handleSelect = (option) => {
    setSelected(option.label);
    setIsOpen(false);

    // TODO: Connect with your actual sort function or API call
    console.log('Selected sort:', option.value);
  };

  return (
    <div className="flex justify-between items-center px-5 mb-6">
      

      {/* Sort Dropdown */}
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition"
        >
          <span className="text-sm font-medium text-gray-700">{selected}</span>
          <FaChevronDown className={`w-3 h-3 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {sortOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;
