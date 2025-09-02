'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WishButton from '../WishButton/WishButton';
import { useDispatch, useSelector } from 'react-redux';
import { addItemSafe } from '@/redux/slices/cartSlice';
import toast from "react-hot-toast";
import { FaShoppingBasket } from 'react-icons/fa';

const BestSellingProducts = ({ title, type, smatPad = false }) => {
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
          console.log(data)
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
  }, []);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);


  // ⬇️ accept product as argument
  const addToCartItem = (product) => {
    const exists = items.find((i) => i.id === product.id);

    if (exists) {
      toast("Item is already in your cart!", {
        icon: <FaShoppingBasket className="text-black" />,
      });
      return;
    }

    const item = {
      id: product.id,
      slug: product.productSlug,
      name: product.productName,
      price: product.productPrice,
      unite_price: product.productPrice,
      image: product.productImages?.[0]?.image
        ? `${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${product.productImages[0].image}`
        : null,
      qty: 1,
    };

    dispatch(addItemSafe(item));

    toast("Added to cart!", {
      icon: <FaShoppingBasket className="text-black" />,
    });
  };


  return (
    <section className={`py-16 ${smatPad ? 'px-4' : ''} sm:px-2 lg:px-16`}>
      <div className="max-w-7xl mx-auto">
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
              <div
                key={product.id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm group relative"
              >
                {/* Wishlist Icon */}
                <div className="absolute top-2 right-2 z-10">
                  <WishButton data={product} />
                </div>

                {/* Product Image */}
                <div
                  className="w-full h-48 overflow-hidden rounded-md mb-3 cursor-pointer relative"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${product.productImages[0]?.image}`}
                    alt={product.productName}
                    fill
                    onClick={() => router.push(`/shop/${product.productSlug}`)}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className='p-4'>
                  {/* Title */}
                  <h3
                    className="text-sm sm:text-base font-semibold tracking-tight text-gray-900 hover:text-black transition-colors duration-200 ease-in-out cursor-pointer line-clamp-2"
                    onClick={() => router.push(`/shop/${product.productSlug}`)}
                  >
                    {product.productName.length > maxLength && !expandedTitles[product.id]
                      ? product.productName.slice(0, maxLength) + "..."
                      : product.productName}

                    {product.productName.length > maxLength && (
                      <span
                        onClick={(e) => toggleShow(e, product.id)}
                        className="text-blue-500 hover:underline ml-1"
                      >
                        {expandedTitles[product.id] ? "less" : "more"}
                      </span>
                    )}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center mt-2.5 mb-4">
                    {product.average_rating ? (
                      <>
                        <div className="flex items-center space-x-1">
                          {[...Array(Math.floor(product.average_rating))].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-yellow-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                          ))}
                          {/* Remaining empty stars */}
                          {[...Array(5 - Math.floor(product.average_rating))].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-gray-300"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                          ))}
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ml-3">
                          {product.average_rating}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-gray-500 italic">
                        Waiting for the first review
                      </span>
                    )}
                  </div>


                  {/* Pricing + CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      {parseFloat(product.productPrice)} {process.env.NEXT_PUBLIC_CURRENCY}
                    </span>
                    {product.productComparePrice && (
                      <span className="line-through text-gray-400 text-sm ml-2">
                        {parseFloat(product.productComparePrice)}{" "}
                        {process.env.NEXT_PUBLIC_CURRENCY}
                      </span>
                    )}

                    <button
                      onClick={() => addToCartItem(product)}   // ✅ pass product here
                      className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
                    >
                      Add to cart
                    </button>

                  </div>
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