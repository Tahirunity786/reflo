'use client';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const BestSellingProducts = ({title, type}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [bsData, setBSData] = useState([]);
  const [expandedTitles, setExpandedTitles] = useState({});
  const maxLength = 19;

  const toggleShow = (e, id) => {
    e.stopPropagation();
    setExpandedTitles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };



  useEffect(() => {

    const fetchBSProducts = async () => {

      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/products?type=${type}&quantity=4`);
        if (response.ok) {
          const data = await response.json();
          setBSData(data);
          setLoading(false);
        }
      }
      catch (e) {
        console.error(e);
        setErrorState(true);
        setLoading(false);
      }
    }


    fetchBSProducts()
  }, [])

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-2">
            Unmatched design—superior performance and customer satisfaction in one.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse space-y-4 p-4  rounded-xl bg-gray-100"
              >
                <div className="h-[300px] bg-gray-300 rounded-xl" />
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-300 rounded w-1/2" />
                <div className="h-4 bg-gray-300 rounded w-1/3" />
                <div className="flex gap-2 mt-2">
                  {[...Array(3)].map((_, i) => (
                    <span key={i} className="w-5 h-5 rounded-full bg-gray-300" />
                  ))}
                </div>
              </div>
            ))
          ) : (
            bsData.map((product) => (
              <div key={product.id} className="relative group">
                {/* Wishlist Icon */}
                <button className="absolute top-4 z-50 right-4 text-gray-600 hover:text-black">
                  <Heart className="w-5 h-5" />
                </button>

                {/* Product Image */}
                <div className="w-full overflow-hidden rounded-lg mb-4 aspect-[5/5]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${product.productImages[0]?.image}`}
                    alt={product.productName}
                    width={300}
                    height={400}
                    className="object-cover w-full  transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                    onClick={() => { router.push(`/shop/${product.productSlug}`) }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-base sm:text-lg font-semibold text-gray-800 hover:text-black transition-colors duration-200 ease-in-out cursor-pointer"
                  onClick={() => router.push(`/shop/${product.productSlug}`)}
                >
                  {product.productName.length > maxLength && !expandedTitles[product.id]
                    ? product.productName.slice(0, maxLength) + '... '
                    : product.productName}

                  {product.productName.length > maxLength && (
                    <span
                      onClick={(e) => toggleShow(e, product.id)}
                      className="text-blue-500 hover:underline ml-1"
                    >
                      {expandedTitles[product.id] ? 'less' : 'more'}
                    </span>
                  )}
                </h3>


                <div className="text-yellow-500 text-sm mb-1">
                  {'★'.repeat(3)}{'☆'.repeat(5 - 3)}
                </div>

                {/* Pricing */}
                <div className="text-sm sm:text-base font-semibold text-gray-900">
                  {parseFloat(product.productPrice)}{" "} {process.env.NEXT_PUBLIC_CURRENCY}
                  {product.productComparePrice && (
                    <span className="line-through text-gray-400 text-sm ml-1 font-normal">
                      {parseFloat(product.productComparePrice)} {process.env.NEXT_PUBLIC_CURRENCY}
                    </span>
                  )}
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(BestSellingProducts);