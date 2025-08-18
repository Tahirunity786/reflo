// components/HappyCustomers.js
import Image from 'next/image';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Cameron Smith',
    verified: true,
    rating: 5,
    review: 'A perfect product, it keeps you very warm without over heating. True to size, I couldn’t be happier with the purchase… Thank you! 🧡',
    product: {
      name: 'Waistcoat with pockets',
      price: '$270.00',
      oldPrice: '$320.00',
      image: '/Image/main_clt4.webp',
    },
    image: '/Image/main_clt4.webp' ,
  },
  {
    name: 'Algistino Lionel',
    verified: true,
    rating: 5,
    review: 'A fantastic purchase! The product provides just the right amount of warmth without causing overheating. Highly recommend! 😊',
    product: {
      name: 'Zip neck jumper',
      price: '$200.00',
      oldPrice: null,
      image: '/Image/main_clt4.webp' ,
    },
    image: '/Image/main_clt4.webp' ,
  },
];

export default function HappyCustomers() {
  return (
    <section className="bg-[#F4F1EA] py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Happy Customers</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Customers love our products and we always strive to please them all.
        </p>
      </div>

      {/* Reviews grid */}
      <div className="grid md:grid-cols-2 gap-8 px-6 max-w-7xl mx-auto">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm"
          >
            {/* Customer Image */}
            <div className="w-full md:w-1/2 h-[350px] relative">
              <Image
                src={review.image}
                alt={review.name}
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Review Content */}
            <div className="p-6 w-full md:w-1/2">
              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {Array(review.rating)
                  .fill()
                  .map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                  ))}
              </div>

              {/* Name and verification */}
              <p className="font-semibold text-sm">
                {review.name}{' '}
                {review.verified && (
                  <span className="text-gray-400 text-xs italic ml-1">
                    ✓ Verified Buyer
                  </span>
                )}
              </p>

              {/* Text */}
              <p className="text-sm text-gray-700 my-3">{review.review}</p>

              {/* Product details */}
              <div className="flex items-center gap-4 mt-4">
                <Image
                  src={review.product.image}
                  alt={review.product.name}
                  width={50}
                  height={60}
                  className="rounded"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {review.product.name}
                  </p>
                  <p className="text-red-600 font-semibold">
                    {review.product.price}
                    {review.product.oldPrice && (
                      <span className="text-gray-400 line-through ml-2 text-sm">
                        {review.product.oldPrice}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
