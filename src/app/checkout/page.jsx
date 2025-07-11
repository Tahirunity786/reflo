'use client';

import CompactProductList from '@/components/CompactProductList/CompactProductList';
import CouponCollapse from '@/components/CouponCollapse/CouponCollapse';
import { useState } from 'react';

export default function CheckoutPage() {
     const [selectedPayment, setSelectedPayment] = useState('cod');
    // Form state
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        country: '',
    });

    // Sample order data (replace with real cart state)
    const orderItems = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 120,
            qty: 1,
            image: '/headphones.jpg',
        },
        {
            id: 2,
            name: 'Smart Watch',
            price: 99,
            qty: 2,
            image: '/smart-watch.jpg',
        },
    ];

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Handle form change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Submit placeholder
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order submitted', form);
        alert('Order submitted!');
    };

    return (
        <div className="max-w-7xl mx-auto px-5 py-12 bg-white">
            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <nav className="text-sm text-gray-500 mb-8 ">
                Home &gt; <span className="text-black">Shopping Cart</span> &gt;{" "}
                <span className="font-semibold">Checkout</span>
            </nav>

            {/* Main Grid: Form + Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
                {/* Left: Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 shadow p-6">
                <CouponCollapse/>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                required
                                value={form.fullName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                value={form.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                required
                                value={form.city}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                                ZIP Code
                            </label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                required
                                value={form.zip}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                required
                                value={form.country}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>
<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>

      <div className="space-y-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={selectedPayment === 'cod'}
            onChange={() => setSelectedPayment('cod')}
            className="form-radio text-orange-500 w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Cash on Delivery (COD)</span>
        </label>

        {/* Optional: Add description or icon */}
        <p className="text-sm text-gray-500 ml-8">
          Pay with cash upon delivery. No extra charges apply.
        </p>
      </div>
    </div>
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                    >
                        Place Order
                    </button>
                    <CompactProductList />
                </form>

                {/* Right: Order Summary */}
                <div className="rounded-lg  space-y-6">
                    <div className="bg-gray-100 shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>

                        <ul className="divide-y divide-gray-300">
                            {orderItems.map((item) => (
                                <li key={item.id} className="flex items-center justify-between py-3">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-14 h-14 object-cover rounded"
                                        />
                                        <div>
                                            <p className="text-sm font-medium">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                    <p className="text-orange-500 font-semibold">
                                        ${(item.price * item.qty).toFixed(2)}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="text-orange-600">${subtotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
