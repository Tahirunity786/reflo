'use client';

import Image from 'next/image';
import { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Apple Watch',
    image: '/docs/images/products/apple-watch.png',
    price: 599,
    quantity: 1,
  },
  {
    id: 2,
    name: 'iMac 27"',
    image: '/docs/images/products/imac.png',
    price: 2499,
    quantity: 1,
  },
  {
    id: 3,
    name: 'iPhone 12',
    image: '/docs/images/products/iphone-12.png',
    price: 999,
    quantity: 1,
  },
];

export default function ProTable() {
  const [cartItems, setCartItems] = useState(products);

  const updateQuantity = (id, type) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === 'increase'
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-orange-500 ">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">Product</th>
            <th scope="col" className="px-6 py-3">Qty</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id} className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-16 md:w-32 max-w-full max-h-full"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.name}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {/* Decrease Quantity */}
                  <button
                    onClick={() => updateQuantity(item.id, 'decrease')}
                    className="inline-flex cursor-pointer items-center justify-center p-1 me-3 h-6 w-6 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                    aria-label="Decrease quantity"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>

                  {/* Quantity Input */}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e =>
                      updateQuantity(item.id, e.target.value < 1 ? 'decrease' : 'set')
                    }
                    className="w-14 px-2.5 py-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  {/* Increase Quantity */}
                  <button
                    onClick={() => updateQuantity(item.id, 'increase')}
                    className="inline-flex cursor-pointer items-center justify-center p-1 ms-3 h-6 w-6 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                    aria-label="Increase quantity"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ${item.price}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => removeItem(item.id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
