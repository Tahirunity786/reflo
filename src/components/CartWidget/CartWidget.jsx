'use client';

import { useState } from "react";
import ProTable from "../ProTable/ProTable";

// Initial cart items
const initialCart = [
  {
    id: 1,
    name: "Patek Eleven",
    image: "/patek-eleven.jpg",
    price: 200,
    quantity: 2,
  },
  {
    id: 2,
    name: "Baby Trolley",
    image: "/baby-trolley.jpg",
    price: 150,
    quantity: 1,
  },
];

// Related products (example, replace with real data or props)
const relatedProducts = [
  {
    id: 101,
    name: "Smart Watch",
    image: "/smart-watch.jpg",
    price: 99,
  },
  {
    id: 102,
    name: "Wireless Headphones",
    image: "/headphones.jpg",
    price: 149,
  },
];

export default function CartWidget() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [coupon, setCoupon] = useState("");

  // Update quantity of items
  const updateQuantity = (id, value) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(value) || 1 } : item
    );
    setCartItems(updatedCart);
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Subtotal calculation
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-5 py-10 text-gray-800">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        Home &gt; <span className="text-black">Shopping Cart</span> &gt;{" "}
        <span className="font-semibold">My Shopping Cart</span>
      </nav>

      <h1 className="text-2xl font-semibold mb-6">My Shopping Cart</h1>

      {/* Main grid: Cart (left) + Related (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Cart section (2/3 on large screens) */}
        <div className="lg:col-span-2">
          {/* Cart Table */}
          <div className="overflow-x-auto rounded-lg mb-6">
            <ProTable/>
          </div>

          {/* Coupon + Update */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="border px-4 py-2 rounded w-full md:w-60"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                Apply coupon
              </button>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
              Update cart
            </button>
          </div>

          {/* Cart Totals */}
          <div className="bg-gray-100 p-6 rounded shadow-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Cart totals</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="text-orange-500 font-medium">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-orange-600">${subtotal.toFixed(2)}</span>
            </div>
            <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-medium rounded">
              Proceed to checkout
            </button>
          </div>
        </div>

        {/* Right: Related Products */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Related Products
          </h2>
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-700 hover:text-orange-500 cursor-pointer">
                  {product.name}
                </h3>
                <p className="text-orange-500 font-medium">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
