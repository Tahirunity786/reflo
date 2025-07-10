'use client';

import { useState } from 'react';

const initialWishlist = [
  {
    id: 1,
    name: 'V-neck Blouse',
    image: '/vneck-blouse.jpg',
    price: 65.0,
    inStock: true,
  },
];

const relatedProducts = [
  {
    id: 101,
    name: 'Stylish Handbag',
    image: '/handbag.jpg',
    price: 45.0,
  },
  {
    id: 102,
    name: 'Summer Sandals',
    image: '/sandals.jpg',
    price: 39.99,
  },
  {
    id: 103,
    name: 'Sunglasses',
    image: '/sunglasses.jpg',
    price: 25.0,
  },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  // Remove item from wishlist
  const removeItem = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  // Add to cart (stub)
  const handleAddToCart = (item) => {
    console.log('Add to cart:', item);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-800">
      {/* Page Heading */}
      <h1 className="text-2xl font-semibold mb-6">
        My Wishlist on Shopping Cart
      </h1>

      {/* Two-column layout: Wishlist (left) + Related Products (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wishlist Table (span 2 columns on large screens) */}
        <div className="lg:col-span-2 overflow-x-auto rounded-lg bg-white">
          <table className="min-w-full text-left">
            <thead className="bg-orange-500 text-sm text-white">
              <tr>
                <th className="p-4"></th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Unit Price</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 font-bold text-lg"
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span className="text-orange-500 hover:underline cursor-pointer">
                      {item.name}
                    </span>
                  </td>
                  <td className="p-4 text-orange-500 font-medium">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span
                      className={`font-medium ${
                        item.inStock ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4">
                    {item.inStock && (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="text-orange-500 hover:underline font-medium"
                      >
                        Add to Cart
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {wishlist.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    Your wishlist is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Related Products */}
        <aside className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Related Products
          </h2>
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="flex gap-4 p-4  rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex flex-col justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {product.name}
                </span>
                <span className="text-orange-500 font-semibold text-sm">
                  ${product.price.toFixed(2)}
                </span>
                <button className="text-sm text-blue-600 hover:underline mt-1">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
