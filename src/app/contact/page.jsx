'use client';

import Header from '@/components/Header/Header';
import { Clock } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function ContactPage() {
  // ---------- State Management ----------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    privacy: false,
  });

  const [loading, setLoading] = useState(false); // Track submit status
  const [success, setSuccess] = useState(null); // Show success or error message

  // ---------- Handle Input Changes ----------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ---------- Handle Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSuccess({ type: "error", message: "All fields are required." });
      return;
    }

    if (!formData.privacy) {
      setSuccess({
        type: "error",
        message: "You must agree to the Privacy Policy.",
      });
      return;
    }

    setLoading(true);
    setSuccess(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/contact/contact/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }

      setSuccess({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "", privacy: false }); // Reset form
    } catch (error) {
      console.error(error);
      setSuccess({
        type: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const metaData = {
    title: `DoorBix || Contact Us`,
    description: `Get in touch with the DoorBix team for customer support, inquiries, or feedback. We’re here to assist you and ensure a smooth shopping experience.`,
    image: `https://www.doorbix.com/Image/Logo.png`,
    pageUrl: `https://www.doorbix.com/shop/contact`,
  }

  return (
    <div className='py-8 lg:px-8'>
      <Header title={metaData.title} description={metaData.description} imageUrl={metaData.image} pageUrl={metaData.pageUrl} />

      {/* Breadcrumb Navigation */}
      <div className="text-center px-4 py-2 border-b border-gray-200">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm text-gray-500">
            <a href="/" className="text-black">Home</a>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-700">Contact</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-gray-900 mb-4">Contact Us</p>
          <p className="text-gray-600">
            Please use the below form. You can send you enquiries or get help by sending an email{' '}
            <span className="text-blue-500">info@doorbix.com</span>
          </p>
        </div>

        {/* Map */}
        {/* <div className="mb-12">
          <iframe
            title="Google Map - Fawn Creek Township"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.054334905448!2d-95.92486568464848!3d37.066415979893825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b0eb9f4f3a0d91%3A0xe59dd6fa95dd5b94!2sFawn%20Creek%20Township%2C%20KS!5e0!3m2!1sen!2sus!4v1688912345678"
            className="w-full h-96 rounded-lg border border-gray-200"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div> */}

        {/* Support & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Support Info */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Support Customer</h2>
            <p className="text-gray-600 mb-6">
              Have a question? Please contact us using the customer support channels below.
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 mb-2">Customer Care:</p>
                <p className="text-gray-600">Email: info@doorbix.com</p>
                <p className="text-gray-600">Operating hours: Everyday 8:00am - 5:00pm</p>
              </div>

              {/* <div>
                <p className="font-medium text-gray-900 mb-2">Wholesale:</p>
                <p className="text-gray-600">Email: sales@sheltonwomen.com</p>
              </div> */}

              <div>
                <p className="font-medium text-gray-900 mb-2">Press Enquiries:</p>
                <p className="text-gray-600">Email: support@doorbix.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-2">
              Please submit all general enquiries in the contact form below and we look forward to hearing from you soon.
            </p>

            <p className="flex items-center gap-2 text-gray-700 mb-6">
              <Clock className="w-5 h-5 text-gray-500" />
              <span>Average response time: <strong> 30 minutes</strong></span>
            </p>

            <form
              className="space-y-4 max-w-2xl mx-auto"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Message */}
              <textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please enter your message"
                className="w-full px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                required
              ></textarea>

              {/* Privacy Policy */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="privacy"
                  id="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  className="mt-1 mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="/privacy" className="text-blue-500 hover:underline">
                    Privacy Policy
                  </a>{" "}
                  of the website.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`${loading ? "bg-gray-500" : "bg-gray-800 hover:bg-gray-700"
                    } text-white px-8 py-3 rounded-md font-medium transition-colors duration-200`}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>

              {/* Success / Error Message */}
              {success && (
                <p
                  className={`mt-3 text-sm ${success.type === "success" ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {success.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}
