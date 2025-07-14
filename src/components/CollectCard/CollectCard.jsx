'use client';

import { Flag } from 'lucide-react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Reusable Card component with an image and a button at the bottom center.
 */
const CollectCard = ({ imageSrc, imageAlt, buttonLabel, onButtonClick, hSm=false }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg group">
      {/* Image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={400}
        height={500}
        className={`object-cover w-full ${hSm?"h-[15rem]":"h-[22rem]"}`}
        loading="lazy"
      />

      {/* Overlay Button */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={onButtonClick}
          className="bg-white text-black font-semibold text-sm px-12 py-2 rounded-full shadow-sm hover:bg-gray-200 transition"
        >
          {buttonLabel}
        </button>
      </div>

      {/* Optional hover overlay */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300" />
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
