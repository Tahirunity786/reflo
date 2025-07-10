'use client';

import { useState } from 'react';

export default function Page() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Connect this with API, EmailJS, Formspree, etc.
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");

    // Clear form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-16 px-4 md:px-10 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      {/* Contact Form & Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              required
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info & Map */}
        <div className="flex flex-col gap-6">
          {/* Contact Details */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Our Office</h2>
            <p className="text-gray-700">123 Commerce Street,<br />Bahawalpur, Punjab, Pakistan</p>

            <div className="mt-4">
              <p className="text-gray-700"><strong>Phone:</strong> +92 300 1234567</p>
              <p className="text-gray-700"><strong>Email:</strong> support@shopname.com</p>
            </div>
          </div>

          {/* Google Map Placeholder */}
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://maps.google.com/maps?q=Bahawalpur%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              className="rounded-lg shadow-md border"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shop Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
