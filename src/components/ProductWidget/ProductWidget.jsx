'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// DRY category array
const categories = [
  { name: 'Demin', image: '/Image/main_clt4.webp' },
  { name: 'Blazers', image: '/Image/main_clt4.webp' },
  { name: 'Crop-top', image: '/Image/main_clt4.webp' },
  { name: 'Sweaters', image: '/Image/main_clt4.webp' },
  { name: 'T-Shirts', image: '/Image/main_clt4.webp' },
];


const ProductWidget = () => {
  const [cData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCollection = async () => {

      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/collections?quantity=5`);
        if (response.ok) {
          const data = await response.json();
          setData(data);
          setLoading(true);
        }
        setLoading(false);
      }
      catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
    fetchCollection();

  }, [])
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Shop By Collections
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Express your style with our standout collection—fashion meets sophistication.
        </p>
      </div>

      {/* Scrollable on small, grid on md+ */}
      <div className="md:grid md:grid-cols-5 gap-6 overflow-x-auto flex md:flex-none space-x-4 md:space-x-0 no-scrollbar snap-x snap-mandatory">
        {Array.isArray(cData) &&
          cData.map((category, index) => (
            <div
              key={category.id || index}
              className="min-w-[70%] sm:min-w-[40%] md:min-w-0 flex-shrink-0 md:flex-shrink snap-center flex flex-col items-center text-center"
            >
              {/* Image */}
              <div className="w-full aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${category.collectionImage}`}
                  alt={category.collectionName}
                  width={300}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Name */}
              <Link href={`/collection/${category.collectionSlug}`} className="mt-3 font-semibold text-lg text-gray-900">
                {category.collectionName}
              </Link>
            </div>
          ))}

      </div>
    </section>
  );
};

export default ProductWidget;
