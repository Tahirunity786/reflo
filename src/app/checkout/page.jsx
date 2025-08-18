'use client';
import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal, removeItem, updateQty } from "@/redux/slices/cartSlice";
import * as Tooltip from "@radix-ui/react-tooltip";

// Helper Component: Input Field
const Input = ({ type = 'text', placeholder }) => (
    <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
);

// Helper Component: Select Dropdown
const Select = ({ options }) => (
    <div className="relative">
        <select className="appearance-none w-full px-3 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {options.map((opt, idx) => (
                <option key={idx}>{opt}</option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>
);

export default function CheckoutForm() {

    const dispatch = useDispatch();
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const maxLength = 20;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 py-8 ">
                {/* Left Side: Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-8">
                    {/* Contact Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h2>
                        <button className="text-sm text-blue-600 dark:text-blue-400 mb-4">Log in</button>
                        <div className="space-y-4">
                            <Input placeholder="Email or mobile phone number" />
                            <div className="flex items-center">
                                <input id="emailOffers" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor="emailOffers" className="ml-2 text-sm text-gray-600 dark:text-gray-400">Email me with news and offers</label>
                            </div>
                        </div>
                    </section>

                    {/* Delivery Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delivery</h2>
                        <div className="space-y-4">
                            <Select options={['Ship', 'Express']} />
                            <Select options={['Pickup in store', 'Home delivery']} />
                        </div>
                    </section>

                    {/* Address Section */}
                    <section className="space-y-4">
                        <Select options={['Canada/English', 'United States']} />
                        <p className="text-sm text-gray-600 dark:text-gray-400">United States</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input placeholder="First name (optional)" />
                            <Input placeholder="Last name" />
                        </div>

                        <div className="relative">
                            <Input placeholder="Address" />
                            <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>

                        <Input placeholder="Apartment, suite, etc. (optional)" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input placeholder="City" />
                            <Select options={['State', 'Hawaii']} />
                            <Input placeholder="ZIP code" />
                        </div>

                        <div className="flex items-center">
                            <input id="saveInfo" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-600 dark:text-gray-400">Save this information for next time</label>
                        </div>
                    </section>

                    {/* Shipping Method */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping method</h2>
                        <div className="border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 p-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Enter your shipping address to view available shipping methods.</p>
                        </div>
                    </section>

                    {/* Payment Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">All transactions are secure and encrypted.</p>
                        <div className="border border-gray-300 dark:border-gray-600 rounded-md">
                            <div className="bg-blue-50 dark:bg-blue-900 border-b border-gray-300 dark:border-gray-600 rounded-t-md p-4 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Credit card</span>
                                <div className="w-8 h-5 bg-orange-500 text-white text-xs flex items-center justify-center font-bold rounded">MC</div>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="relative">
                                    <Input placeholder="Card number" />
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                        <svg className="w-4 h-4 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="Expiration date (MM / YY)" />
                                    <div className="relative">
                                        <Input placeholder="Security code" />
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                            <svg className="w-4 h-4 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <Input placeholder="Name on card" />
                                <div className="flex items-center">
                                    <input id="billingAddress" type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <label htmlFor="billingAddress" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        Use shipping address as billing address
                                    </label>
                                </div>
                            </div>
                        </div>
                    </section>

                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Pay now
                    </button>

                    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 flex space-x-4 text-sm">
                        <a href="#" className="text-blue-600 dark:text-blue-400">Privacy policy</a>
                        <a href="#" className="text-blue-600 dark:text-blue-400">Cancellation policy</a>
                    </div>
                </div>

                {/* Right Side: Cart Summary */}
                <div className=" dark:bg-gray-800 space-y-6">
                    <div className="bg-white shadow-sm p-6 rounded-lg">
                        {items.map((item) => {
                            const isLong = item.name.length > maxLength;
                            const displayName = isLong ? item.name.slice(0, maxLength) + "..." : item.name;
                            return (


                                <div className="flex items-center space-x-4 space-y-4" key={item.id}>
                                    <div className="relative">
                                        <img src={item.image} className="w-15 h-15 object-cover rounded-md" />
                                        {/* <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">1</span> */}
                                    </div>
                                    <div className="flex-1">
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
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.qty}</p>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{(item.price * item.qty)} {process.env.NEXT_PUBLIC_CURRENCY}</div>
                                </div>
                            );
                        })}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="text-gray-900 dark:text-white">{total} {process.env.NEXT_PUBLIC_CURRENCY}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                <span className="text-gray-500 dark:text-gray-400">Free</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-lg font-semibold">
                            <span className="text-gray-900 dark:text-white">Total</span>
                            <div className="text-right">
                             
                                <span className="ml-1 text-gray-900 dark:text-white">{total} {process.env.NEXT_PUBLIC_CURRENCY}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
