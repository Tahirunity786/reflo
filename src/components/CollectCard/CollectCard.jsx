'use client';

import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Modern, elegant reusable Card with image + action button.
 */
const CollectCard = ({ imageSrc, imageAlt, buttonLabel, onButtonClick, hSm = false }) => {
  return (
    <div
      className="group w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-gray-100 
                 bg-white shadow-sm hover:shadow-xl transition-all duration-300 
                 transform hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          onClick={onButtonClick}
          width={400}
          height={500}
          className={`object-cover w-full cursor-pointer ${hSm ? 'h-[15rem]' : 'h-[22rem]'} 
                      transition-transform duration-500 group-hover:scale-105`}
          loading="lazy"
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-70 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-4 flex justify-center">
        <button
          onClick={onButtonClick}
          className="w-full sm:w-auto px-6 py-2 rounded-full text-sm font-medium
                     bg-gradient-to-r from-gray-900 to-gray-700 text-white
                     hover:from-gray-800 hover:to-gray-600
                     shadow-md hover:shadow-lg transition-all duration-300"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

CollectCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  buttonLabel: PropTypes.string,
  onButtonClick: PropTypes.func,
};

CollectCard.defaultProps = {
  imageAlt: 'Card image',
  buttonLabel: 'Shop Now',
  onButtonClick: () => alert('Button clicked'),
};

export default CollectCard;
