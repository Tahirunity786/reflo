'use client';

import { useState } from 'react';

export default function CouponCollapse() {
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    alert(`Coupon applied: ${couponCode}`);
    // You can implement actual validation logic here
  };

  return (
    <div className="border-t-4 border-blue-600 bg-gray-50 p-4 mb-6">
      <div className="flex items-center space-x-2">
        <input
          id="toggleCoupon"
          type="checkbox"
          className="accent-blue-600 w-4 h-4"
          onChange={() => setShowCoupon(!showCoupon)}
        />
        <label htmlFor="toggleCoupon" className="text-sm text-gray-800">
          Have a coupon?{' '}
          <button
            type="button"
            className="text-orange-600 font-medium underline hover:text-orange-700 transition"
            onClick={() => setShowCoupon((prev) => !prev)}
          >
            Click here to enter your code
          </button>
        </label>
      </div>

      {/* Collapsible input field */}
      {showCoupon && (
        <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition"
          >
            Apply Coupon
          </button>
        </div>
      )}
    </div>
  );
}
