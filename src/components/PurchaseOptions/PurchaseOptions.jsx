'use client';
import React, { useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa';

const PurchaseOptions = () => {
  const [selectedOption, setSelectedOption] = useState('one-time');

  // DRY: Centralized options config
  const options = [
    {
      key: 'one-time',
      label: 'One Time Purchase',
      price: 320.0,
      discountedPrice: null,
      badge: null,
    },
    {
      key: 'subscription',
      label: 'Subscribe and save',
      price: 320.0,
      discountedPrice: 288.0,
      badge: 'SAVE 10%',
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-6">
        <button className="w-10 h-10 rounded-full bg-gray-100 text-xl">−</button>
        <span className="text-xl">1</span>
        <button className="w-10 h-10 rounded-full bg-gray-100 text-xl">+</button>
      </div>

      {/* Purchase Options */}
      <div className="space-y-4">
        <h3 className="font-semibold">Purchase Options</h3>
        {options.map((option) => (
          <label
            key={option.key}
            className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer transition ${
              selectedOption === option.key ? 'border-black' : 'border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="purchase"
                checked={selectedOption === option.key}
                onChange={() => setSelectedOption(option.key)}
              />
              <span className="text-sm font-medium">{option.label}</span>
              {option.badge && (
                <span className="ml-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                  {option.badge}
                </span>
              )}
            </div>
            <div className="text-sm font-medium text-right">
              {option.discountedPrice ? (
                <>
                  <span className="line-through text-gray-500">${option.price.toFixed(2)}</span>{' '}
                  <span className="text-black">${option.discountedPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-black">${option.price.toFixed(2)}</span>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* Subscription Detail */}
      {selectedOption === 'subscription' && (
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <FaSyncAlt />
          <span>Subscription detail</span>
        </div>
      )}

      {/* Cart & Terms Section */}
      <div className="space-y-3">
        {/* Add to Cart Button */}
        <button className="w-full bg-black mb-8 text-white py-3 rounded-full hover:bg-gray-800 transition">
          Add to Cart
        </button>

        {/* Terms and Conditions */}
        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" id="terms" className="accent-black" />
          <label htmlFor="terms">
            I agree with <span className="underline">Terms & Conditions</span>
          </label>
        </div>

        {/* Buy It Now Button */}
        <button className="w-full rounded-full bg-red-500/10 text-red-600 py-3 hover:bg-red-200 transition">
          Buy It Now
        </button>
      </div>
    </div>
  );
};

export default PurchaseOptions;
