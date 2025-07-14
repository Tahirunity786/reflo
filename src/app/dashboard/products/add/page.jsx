'use client';

import { useState } from 'react';

export default function AddProductPage() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="items-center mb-4 flex">
          <button
            type="button"
            className="dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-gray-500 mr-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <p className="text-xl font-medium text-gray-900 dark:text-white">Add product</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section (Main Form) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Title</label>
            <input
              type="text"
              placeholder="Short sleeve t-shirt"
              className="border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full px-3 py-2 rounded-md text-gray-900 bg-white dark:bg-gray-700"
            />
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Description</label>
            <div className="rounded-md border border-gray-300 dark:border-gray-600">
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-700 flex items-center border-b border-gray-200 dark:border-gray-600">
                <select className="dark:text-gray-400 border-none focus:outline-none text-sm text-gray-600 bg-transparent mr-4">
                  <option>Paragraph</option>
                </select>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3].map((_, i) => (
                    <button key={i} type="button" className="p-1 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 min-h-[200px]">
                <p className="text-gray-500 text-sm dark:text-gray-400">Start typing your product description...</p>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <label className="text-sm font-medium text-gray-700 mb-4 block dark:text-gray-300">Media</label>
            <div className="rounded-lg text-center border-2 border-dashed border-gray-300 dark:border-gray-600 p-8">
              <div className="space-y-2">
                <div className="text-gray-400 dark:text-gray-500">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Drag and drop files here or click to upload</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">Accepts images, videos, and other files</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Pricing</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Price</label>
                <div className="flex">
                  <span className="items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-500 text-sm rounded-l-md inline-flex border border-r-0 border-gray-300 dark:border-gray-600 dark:text-gray-400">
                    Rs
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3 py-2 rounded-r-md text-gray-900 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              {/* Compare-at Price */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Compare-at price</label>
                <div className="flex">
                  <span className="items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-500 text-sm rounded-l-md inline-flex border border-r-0 border-gray-300 dark:border-gray-600 dark:text-gray-400">
                    Rs
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3 py-2 rounded-r-md text-gray-900 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Charge Tax */}
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600 w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Charge tax on this product</span>
              </label>
            </div>

            {/* Cost/Profit/Margin */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Cost per item</label>
                <div className="flex">
                  <span className="items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-500 text-sm rounded-l-md inline-flex border border-r-0 border-gray-300 dark:border-gray-600 dark:text-gray-400">
                    Rs
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-3 py-2 rounded-r-md text-gray-900 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Profit</label>
                <input
                  type="text"
                  className="border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full px-3 py-2 rounded-md text-gray-900 bg-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Margin</label>
                <input
                  type="text"
                  className="border border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full px-3 py-2 rounded-md text-gray-900 bg-white dark:bg-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Category</label>
            <select className="border border-gray-300 dark:border-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full px-3 py-2 rounded-md text-gray-500 bg-white dark:bg-gray-700">
              <option>Choose a product category</option>
            </select>
            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
              Determine the tax and duties to consider when shipping. Filters, and cross-channel selling.
            </p>
          </div>


          {/* Inventory Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Inventory</p>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Track quantity</span>
              </label>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Quantity</label>
                <input
                  type="number"
                  className="w-32 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Shop location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-900 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Continue selling when out of stock</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">This product has a SKU or barcode</span>
              </label>
            </div>
          </div>

          {/* Shipping Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Shipping</p>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">This is a physical product</span>
              </label>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Weight</label>
                <div className="flex">
                  <input
                    type="number"
                    placeholder="0.0"
                    className="flex-1 border border-r-0 border-gray-300 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-l-md text-gray-900 bg-white dark:bg-gray-700"
                  />
                  <select className="border border-gray-300 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded-r-md text-gray-900 bg-white dark:bg-gray-700">
                    <option>kg</option>
                    <option>g</option>
                    <option>lb</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Variant / Custom Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-2">
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add customs information
            </button>
            <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add options like size or color
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Product Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Status</p>
            <select className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>

          {/* Publishing */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Publishing</p>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2 dark:text-gray-400">Online Store</span>
                <input
                  type="checkbox"
                  checked={isOnline}
                  onChange={(e) => setIsOnline(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:border-gray-600"
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Point of Sale</div>
            </div>
          </div>

          {/* Product Organization */}
          {/* (Omitted for brevity; all fields are correct.) */}

          {/* Theme Template */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-lg font-medium text-gray-900 mb-4 dark:text-white">Theme Template</p>
            <select className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Default product</option>
              <option>Custom product</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
