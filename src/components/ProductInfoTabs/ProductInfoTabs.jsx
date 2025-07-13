'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Tab Data
const tabs = [
  {
    label: 'Description',
    content: (
      <p className="text-gray-700 leading-relaxed">
        This premium piece is made from soft, breathable fabric ensuring comfort and durability. A versatile fit for everyday style or elevated moments.
      </p>
    ),
  },
  {
    label: 'Customer Reviews',
    content: (
      <div className="space-y-4 text-gray-700">
        <div>
          <p className="font-semibold">Jane Doe</p>
          <p className="text-sm text-gray-500">★★★★★ – Great quality, fits perfectly!</p>
        </div>
        <div>
          <p className="font-semibold">John Smith</p>
          <p className="text-sm text-gray-500">★★★★☆ – Very comfortable, wish it came in more colors.</p>
        </div>
      </div>
    ),
  },
  {
    label: 'Return & Shipping',
    content: (
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Free shipping on orders over $100.</li>
        <li>Delivery time: 3–7 business days.</li>
        <li>30-day hassle-free returns.</li>
      </ul>
    ),
  },
  {
    label: 'Refund Policy',
    content: (
      <p className="text-gray-700 leading-relaxed">
        You can request a full refund within 30 days of receiving your item. Items must be in original condition with tags attached.
      </p>
    ),
  },
];

export default function ProductInfoTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="mt-14  pt-8">
      {/* Tab Header Buttons */}
      <div className="flex flex-wrap justify-start gap-3 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
              activeTab === index
                ? 'bg-black text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="text-sm bg-white p-4 border border-gray-200 rounded-md shadow-sm"
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
