'use client';

import React from 'react';

export default function ContactPage() {
  return (
    <div className='py-8 lg:px-8'>
      {/* Breadcrumb Navigation */}
      <div className="text-center dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm text-gray-500 dark:text-gray-400">
            <a href="/" className="text-black">Home</a>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-700 dark:text-gray-300">Contact</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Contact Us</p>
          <p className="text-gray-600 dark:text-gray-400">
            Please use the below form. You can also call customer service on{' '}
            <span className="text-blue-500 dark:text-blue-400">(573) 435-3638</span>
          </p>
        </div>

        {/* Map */}
        <div className="mb-12">
          <iframe
            title="Google Map - Fawn Creek Township"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.054334905448!2d-95.92486568464848!3d37.066415979893825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b0eb9f4f3a0d91%3A0xe59dd6fa95dd5b94!2sFawn%20Creek%20Township%2C%20KS!5e0!3m2!1sen!2sus!4v1688912345678"
            className="w-full h-96 rounded-lg border border-gray-200 dark:border-gray-700"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>


        {/* Support & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Support Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Support Customer</h2>
            <p className="text-gray-600 mb-6 dark:text-gray-400">
              Have a question? Please contact us using the customer support channels below.
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 mb-2 dark:text-white">Customer Care:</p>
                <p className="text-gray-600 dark:text-gray-400">Phone: +1 (573) 435-3638</p>
                <p className="text-gray-600 dark:text-gray-400">Email: info@sheltonwomen.com</p>
                <p className="text-gray-600 dark:text-gray-400">Operating hours: Everyday 8:00am - 5:00pm</p>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2 dark:text-white">Wholesale:</p>
                <p className="text-gray-600 dark:text-gray-400">Email: sales@sheltonwomen.com</p>
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-2 dark:text-white">Press Enquiries:</p>
                <p className="text-gray-600 dark:text-gray-400">Email: press@sheltonwomen.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">Contact Us</h2>
            <p className="text-gray-600 mb-6 dark:text-gray-400">
              Please submit all general enquiries in the contact form below and we look forward to hearing from you soon.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <textarea
                rows={6}
                placeholder="Enter please your message"
                className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              ></textarea>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privacy"
                  className="mt-1 mr-3 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-blue-500 dark:text-blue-400 hover:underline">
                    Privacy Policy
                  </a>{' '}
                  of the website.
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-gray-800 dark:bg-gray-700 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
