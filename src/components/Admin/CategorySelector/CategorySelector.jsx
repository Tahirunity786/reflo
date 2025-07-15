'use client';

import { useState, useEffect } from 'react';
import categoryData from "@/app/static/data/categories"

export default function CategorySelector({ onSelectCategory, onSelectSubcategory }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const category = categoryData.find((c) => c.category === selectedCategory);
    setSubcategories(category ? category.subcategories : []);
  }, [selectedCategory]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Category</label>
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          onSelectCategory && onSelectCategory(e.target.value);
        }}
        className="border border-gray-300 dark:border-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full px-3 py-2 rounded-md text-gray-500 bg-white dark:bg-gray-700 mb-3"
      >
        <option value="">Choose a product category</option>
        {categoryData.map((item, index) => (
          <option key={index} value={item.category}>
            {item.category}
          </option>
        ))}
      </select>

      {subcategories.length > 0 && (
        <>
          <label className="text-sm font-medium text-gray-700 mb-2 block dark:text-gray-300">Subcategory</label>
          <select
            onChange={(e) => onSelectSubcategory && onSelectSubcategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full px-3 py-2 rounded-md text-gray-500 bg-white dark:bg-gray-700"
          >
            <option value="">Choose a subcategory</option>
            {subcategories.map((sub, i) => (
              <option key={i} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </>
      )}

      <p className="text-xs text-gray-500 mt-3 dark:text-gray-400">
        Determine the tax and duties to consider when shipping. Filters, and cross-channel selling.
      </p>
    </div>
  );
}
