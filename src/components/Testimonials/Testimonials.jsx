// components/Testimonials.js

import Image from "next/image";
import { Star } from "lucide-react";

function StarRating({ rating }) {
  return (
    <div className="flex items-center text-yellow-500 mb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-yellow-500" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-2 text-gray-600">
            Trusted by thousands of happy shoppers — here are some of their experiences.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Testimonial (Necklace) */}
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
              <StarRating rating={5} />
              <p className="text-gray-700 text-sm leading-relaxed">
                “I ordered the <span className="font-medium">925 Sterling Silver Simple Temperament Clavicle Necklace</span> 
                and it’s absolutely beautiful! The quality feels premium, and it adds such elegance to my outfits. 
                Shipping was fast too. Highly recommend.”
              </p>
           
            </div>
          </div>

          {/* Right Side (2 stacked testimonials) */}
          <div className="space-y-8">
            
            {/* Matte Lipstick Set */}
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
                <StarRating rating={4} />
                <p className="text-gray-700 text-sm leading-relaxed">
                  “The <span className="font-medium">Matte Lipstick Set</span> has gorgeous shades that last all day without drying my lips. 
                  I love how smooth the texture is. I just wish there were a few more nude colors, 
                  but overall an amazing set for the price.”
                </p>
                
              </div>
            </div>

            {/* Sunscreen Lotion */}
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
                <StarRating rating={5} />
                <p className="text-gray-700 text-sm leading-relaxed">
                  “The <span className="font-medium">UV Protection Refreshing Protective Cream Sunscreen Lotion</span> 
                  is a game changer! It feels light, non-greasy, and keeps my skin protected 
                  even during long outdoor days. No white cast at all — love it.”
                </p>
                
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
