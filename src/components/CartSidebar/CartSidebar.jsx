'use client';
import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal, removeItem, updateQty } from "@/redux/slices/cartSlice";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useRouter } from 'next/navigation';

const CartSidebar = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(120);
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const maxLength = 20;


  // Countdown timer logic
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);


  return (
    <div
      className={clsx(
        'fixed top-0 right-0 z-100 p-4 h-full w-full max-w-[22rem] bg-white shadow-xl rounded-l-lg transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">My Cart</h2>
        <button onClick={onClose} aria-label="Close cart" className="text-gray-600 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
      </div>
      {items.map((item) => {
        const isLong = item.name.length > maxLength;
        const displayName = isLong ? item.name.slice(0, maxLength) + "..." : item.name;

        return (
          <div
            key={item.id}
            className="flex items-center gap-4 px-4 py-5 border-b border-gray-100"
          >
            {/* Product Image */}
            <div className="flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-lg object-cover w-20 h-20"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              {/* Product Name with Tooltip */}
              <Tooltip.Provider delayDuration={200}>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <p className="text-sm font-medium text-gray-800 truncate cursor-pointer">
                      {displayName}
                    </p>
                  </Tooltip.Trigger>
                  {isLong && (
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="top"
                        align="center"
                        className="z-[9999] bg-gray-900 text-white px-3 py-1 rounded-md text-xs shadow-lg"
                      >
                        {item.name}
                        <Tooltip.Arrow className="fill-gray-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  )}
                </Tooltip.Root>
              </Tooltip.Provider>

              {/* Price × Quantity */}
              <p className="text-sm text-gray-600 mt-1">
                {(item.price * item.qty)} {process.env.NEXT_PUBLIC_CURRENCY}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center mt-2 space-x-2">
                <button
                  className="px-2 py-1 border rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-800 transition"
                  onClick={() =>
                    item.qty > 1 && dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))
                  }
                >
                  -
                </button>
                <span className="text-sm font-semibold text-gray-900">
                  {item.qty}
                </span>
                <button
                  className="px-2 py-1 border rounded-md text-gray-600 hover:text-gray-800 hover:border-gray-800 transition"
                  onClick={() =>
                    dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* Remove Button */}
            <button
              className="text-gray-400 hover:text-red-500 transition"
              onClick={() => dispatch(removeItem(item.id))}
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        );
      })}



      {/* Urgency Timer (If desired) */}
      {/* {isOpen && (
        <div className="px-4 py-3 text-sm text-red-500 border-t border-gray-100">
          🔥 Checkout within <span className="font-semibold">{`${minutes}m ${seconds}s`}</span> to keep your items.
        </div>
      )} */}

      {/* Subtotal & Actions */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-5 bg-white border-t border-gray-100 space-y-4">
        <div className="flex justify-between text-lg font-semibold text-gray-800">
          <span>Subtotal</span>
          <span className="text-gray-900">{total} {process.env.NEXT_PUBLIC_CURRENCY}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <input type="checkbox" id="terms" defaultChecked className="mt-1 accent-black" />
          <label htmlFor="terms" className="text-gray-600">
            I agree to the <span className="font-semibold underline text-black">Terms & Conditions</span>
          </label>
        </div>

        <button onClick={()=>{router.push('/checkout?i=cart'); onClose()}} className="w-full bg-black text-white py-2 font-semibold rounded-full hover:bg-gray-800 transition duration-300 ease-in-out">
          Checkout
        </button>
        <button className="w-full border border-gray-800 py-2 font-semibold rounded-full hover:bg-gray-100 transition duration-300 ease-in-out">
          View Cart
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
