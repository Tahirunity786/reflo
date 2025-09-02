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

        <HtmlContent content={data?.productDescription} charLimit={'full'} />


      ),
    },
    {
      label: 'Customer Reviews',
      content: (
        <div className="space-y-6">
          {data?.reviews?.length > 0 ? (
            data.reviews.map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-4 last:border-none w-fit"
              >
                {/* Reviewer + Rating */}
                <div className="flex items-center justify-between mb-2 space-x-3">
                  <div className="flex items-center justify-between mb-2 space-x-3">
                    <div className="flex items-center space-x-3">
                      {/* Avatar / Initial */}
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
                        {(review.reviewd_by?.full_name || "A").charAt(0).toUpperCase()}
                      </div>
                      <p className="font-medium text-gray-900 text-sm">
                        {review.reviewd_by?.full_name || "Anonymous"}
                      </p>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.round(review.rating) ? "text-yellow-400" : "text-gray-300"
                            }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {review.rating_comment || "No comment provided."}
                </p>

                {/* Optional review image */}
                {review.rating_image && (
                  <div className="mt-3">
                    <img
                      src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${review.rating_image}`}
                      alt="Review image"
                      className="w-24 h-24 object-cover rounded-md border border-gray-200"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">
              No reviews yet. Be the first to share your experience!
            </p>
          )}

        </div>

      ),
    },
    {
      label: 'Return & Shipping',
      content: (
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Free shipping on all orders</li>
          <li>Product will be deliver withIn <b>2-4 days</b></li>
          <li>To initiate a replacement, please share a video of the incorrect, faulty or damaged .</li>
          <li>Ship the incorrect, faulty damaged or broken product in its original packing (Original Product Box and All Accessories) to our warehouse at the below address: <br /> <b className='mx-6 mb-2 mt-2'>Tazah Global LLC, Warehouse # 13, Plot # 4488, Al Sajaa Industrial, Sharjah, UAE</b></li>
          <li> Within 5 working days of receipt of the incorrect, faulty damaged or broken product we will ship the replacement for you free of charge.</li>
          <li> Please note that we do not offer a replacement for <b>“change of mind”</b>.</li>
        </ul>
      ),
    },
    {
      label: 'Refund Policy',
      content: (
        <p className="text-gray-700 leading-relaxed">
          Currently, we do not offer refunds. If you have any concerns, please feel free to <a href="/contact" className='text-blue-500'>contact</a> our support team and we’ll be happy to assist you.
        </p>

      ),
    },
    {
      label: 'Replacement',
      content: (
        <p className="text-gray-700 leading-relaxed">
          Your request of a replacement within 7 days from the date of delivery will be done free of cost. After 7 days, there will be certain charges for the replacement.
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
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeTab === index
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
