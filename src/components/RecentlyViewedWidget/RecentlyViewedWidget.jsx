"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  selectRecentlyViewed,
  clearRecentlyViewed,
} from "@/redux/slices/viewSlice";
import Image from "next/image"; 
import { useRouter } from "next/navigation"; 
import { useState } from "react";

export default function RecentlyViewedWidget() {
  const items = useSelector(selectRecentlyViewed);
  const dispatch = useDispatch();
  const router = useRouter();

  const [expandedTitles, setExpandedTitles] = useState({});
  const maxLength = 20;

  const toggleShow = (e, id) => {
    e.stopPropagation();
    setExpandedTitles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="p-4 bg-white  rounded-lg max-w-7xl mx-auto px-4 sm:px-2 lg:px-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Recently viewed</h3>
        {items.length > 0 && (
          <button
            onClick={() => dispatch(clearRecentlyViewed())}
            className="text-sm text-red-500 hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Fallback when empty */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
          <Image
            src="/Image/31639182_7821696.svg" // 👈 replace with your illustration or keep placeholder
            alt="No recently viewed products"
            width={180}
            height={180}
            className="mb-4 opacity-80"
          />
          <p className="text-sm sm:text-base font-medium">
            You haven’t viewed any products yet.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="mt-4 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Products
          </button>
        </div>
      ) : (
        /* Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => {
            const imageUrl = p?.image || "/placeholder.png";

            return (
              <div
                key={p.id}
                className="relative group flex items-center gap-4 p-4 rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                {/* Product Image */}
                <div
                  className="relative flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => router.push(`/shop/${p.slug}`)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${imageUrl}`}
                    alt={p?.name || "Product"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between flex-1">
                  <h3
                    className="text-sm sm:text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer line-clamp-2"
                    onClick={() => router.push(`/shop/${p.slug}`)}
                  >
                    {p?.name?.length > maxLength && !expandedTitles[p.id]
                      ? p.name.slice(0, maxLength) + "..."
                      : p.name}

                    {p?.name?.length > maxLength && (
                      <span
                        onClick={(e) => toggleShow(e, p.id)}
                        className="text-blue-500 hover:underline ml-1"
                      >
                        {expandedTitles[p.id] ? "less" : "more"}
                      </span>
                    )}
                  </h3>

                  {/* Price */}
                  <div className="mt-2">
                    <span className="text-base font-bold text-gray-900">
                      {p?.price
                        ? `${parseFloat(p.price)} ${process.env.NEXT_PUBLIC_CURRENCY}`
                        : "—"}
                    </span>
                    {p?.comparePrice && (
                      <span className="line-through text-gray-400 text-sm ml-2">
                        {parseFloat(p.comparePrice)} {process.env.NEXT_PUBLIC_CURRENCY}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  {/* <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => console.log("Add to cart", p)}
                      className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                      Add to Cart
                    </button>
                    <button className="p-2 rounded-lg border hover:bg-gray-100 transition">
                      ❤️
                    </button>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
