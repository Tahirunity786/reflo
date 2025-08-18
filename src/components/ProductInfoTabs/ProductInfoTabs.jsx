'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HtmlContent from '../HtmlContent/HtmlContent';

export default function ProductInfoTabs({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: 'Description',
      content: (
      
          <HtmlContent content={data?.productDescription} charLimit={'full'}/>
          
       
      ),
    },
    {
      label: 'Customer Reviews',
      content: (
        <div className="space-y-4 text-gray-700">
          {data?.productReviews?.length > 0 ? (
            data.productReviews.map((review, index) => (
              <div key={index}>
                <p className="font-semibold">{review.reviewer || "Anonymous"}</p>
                <p className="text-sm text-gray-500">
                  {review.comment || "No comment provided."}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No reviews available.</p>
          )}
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

  return (
    <section className="mt-14 pt-8">
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
