'use client';

import { useState } from 'react';
import { FaChevronDown, FaClock, FaSearch } from 'react-icons/fa';

const FILTER_OPTIONS = [
  'Last day',
  'Last 7 days',
  'Last 30 days',
  'Last month',
  'Last year',
];

const PRODUCT_DATA = [
  {
    name: 'Apple MacBook Pro 17"',
    color: 'Silver',
    category: 'Laptop',
    price: '$2999',
  },
  {
    name: 'Microsoft Surface Pro',
    color: 'White',
    category: 'Laptop PC',
    price: '$1999',
  },
  {
    name: 'Magic Mouse 2',
    color: 'Black',
    category: 'Accessories',
    price: '$99',
  },
  {
    name: 'Apple Watch',
    color: 'Silver',
    category: 'Accessories',
    price: '$179',
  },
  {
    name: 'iPad',
    color: 'Gold',
    category: 'Tablet',
    price: '$699',
  },
  {
    name: 'Apple iMac 27"',
    color: 'Silver',
    category: 'PC Desktop',
    price: '$3999',
  },
];

export default function ProductTable() {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Last 30 days');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredProducts = PRODUCT_DATA.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto ">
      {/* Filter and Search Section */}
      <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        {/* Dropdown Filter */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <FaClock className="w-3 h-3 text-gray-500 dark:text-gray-400 me-2" />
            {selectedFilter}
            <FaChevronDown className="w-2.5 h-2.5 ms-2.5" />
          </button>
          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
              <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                {FILTER_OPTIONS.map(option => (
                  <li key={option}>
                    <div
                      className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      onClick={() => {
                        setSelectedFilter(option);
                        setDropdownOpen(false);
                      }}
                    >
                      <input
                        type="radio"
                        checked={selectedFilter === option}
                        readOnly
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{option}</label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
            <FaSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for items"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
      </div>

      {/* Product Table */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-4">
              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm dark:bg-gray-700 dark:border-gray-600" />
            </th>
            <th className="px-6 py-3">Product name</th>
            <th className="px-6 py-3">Color</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm dark:bg-gray-700 dark:border-gray-600" />
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
              </th>
              <td className="px-6 py-4">{product.color}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
