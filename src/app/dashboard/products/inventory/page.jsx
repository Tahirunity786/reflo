'use client'

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

export default function Page() {
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('Last 30 days');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const filteredProducts = PRODUCT_DATA.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (<>
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
    </>
    )
}
