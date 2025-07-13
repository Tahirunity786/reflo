'use client';
import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

const CartSidebar = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(120);

  // Countdown timer logic
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div
      className={clsx(
        'fixed top-0 right-0 z-100 h-full w-full max-w-[20rem] bg-white shadow-lg transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Shopping Cart (1)</h2>
        <button onClick={onClose} aria-label="Close cart">
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Free Shipping Progress */}
      {/* <div className="bg-gray-100 px-6 py-3 border-b">
        <div className="relative w-full h-2 bg-white rounded-full overflow-hidden mb-1">
          <div className="absolute inset-0 bg-green-500 w-full" />
        </div>
        <p className="text-sm text-gray-700">🎉 Congratulations! You’ve got free shipping!</p>
      </div> */}

      {/* Urgency Notice */}
      {/* <div className="px-6 py-2 text-sm text-red-600 border-b bg-white">
        🔥 Products are limited, checkout within <span className="font-semibold">{`${minutes} m ${seconds} s`}</span>
      </div> */}

      {/* Cart Item */}
      <div className="px-6 py-4 flex gap-4 border-b">
        <Image
          src="/Image/fs_new_s1.webp"
          alt="Product"
          width={60}
          height={60}
          className="rounded object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800">Faux Fur Gilet</p>
          <div className="flex items-center mt-2 space-x-2">
            <button className="px-2 border rounded text-lg">-</button>
            <span className="text-sm">1</span>
            <button className="px-2 border rounded text-lg">+</button>
          </div>
        </div>
        <button>
          <Trash2 className="text-gray-400 hover:text-red-500" />
        </button>
      </div>

      {/* You may also like (Placeholder) */}
      {/* <div className="px-6 py-3 text-sm font-semibold text-gray-800">You may also like...</div>
      <div className="px-6 pb-3">
        <div className="h-24 border rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-xs">
          Upsell component
        </div>
      </div> */}

      {/* Subtotal & Actions */}
      <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-white border-t space-y-4">
        <div className="flex justify-between text-base font-semibold">
          <span>Subtotal</span>
          <span>$288.00</span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <input type="checkbox" id="terms" defaultChecked className="mt-1 accent-black" />
          <label htmlFor="terms">
            I agree with <span className="font-semibold underline">Terms & Conditions</span>
          </label>
        </div>

        <button className="w-full border border-black rounded-full py-2 font-semibold hover:bg-gray-100 transition">
          View Cart
        </button>
        <button className="w-full bg-black text-white rounded-full py-2 font-semibold hover:bg-gray-800 transition">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
