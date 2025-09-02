// components/Testimonials.js

import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Testimonials</h2>
          <p className="mt-2 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Testimonial (Sarah Jones) */}
          <div className="flex items-center bg-gray-50 rounded-2xl p-6 shadow-sm">
            {/* Image */}
            <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Sarah Jones"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Text */}
            <div className="ml-6">
              <p className="text-gray-700 text-sm leading-relaxed">
                Neque porro quisquam est, qui dolore ipsum quia dolor sit amet,
                consectetur adipisci velit, sed quia non numquam eius modi tempora
                incidunt.
              </p>
              <h4 className="mt-3 font-semibold text-gray-900">Sarah Jones</h4>
              <span className="text-sm text-gray-500">Interior Designer</span>
            </div>
          </div>

          {/* Right Side (2 stacked testimonials) */}
          <div className="space-y-8">
            
            {/* Jessica Foxx */}
            <div className="flex items-center bg-gray-50 rounded-2xl p-6 shadow-sm">
              {/* Image */}
              <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Jessica Foxx"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Text */}
              <div className="ml-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Neque porro quisquam est, qui dolore ipsum quia dolor sit amet,
                  consectetur adipisci velit, sed quia non numquam eius modi tempora
                  incidunt.
                </p>
                <h4 className="mt-3 font-semibold text-gray-900">Jessica Foxx</h4>
                <span className="text-sm text-gray-500">Student</span>
              </div>
            </div>

            {/* Briana Luke */}
            <div className="flex items-center bg-gray-50 rounded-2xl p-6 shadow-sm">
              {/* Image */}
              <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="https://randomuser.me/api/portraits/women/29.jpg"
                  alt="Briana Luke"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Text */}
              <div className="ml-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Neque porro quisquam est, qui dolore ipsum quia dolor sit amet,
                  consectetur adipisci velit, sed quia non numquam eius modi tempora
                  incidunt.
                </p>
                <h4 className="mt-3 font-semibold text-gray-900">Briana Luke</h4>
                <span className="text-sm text-gray-500">Student</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
