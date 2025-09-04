'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProductWidget = () => {
  const [cData, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/product/collections?quantity=5`
        );
        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, []);

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

      {/* Swiper Carousel */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 16 }, // sm
            768: { slidesPerView: 3, spaceBetween: 20 }, // md
            1024: { slidesPerView: 4, spaceBetween: 24 }, // lg
          }}
          spaceBetween={16}
          className="relative"
        >
          {Array.isArray(cData) &&
            cData.map((category, index) => (
              <SwiperSlide key={category.id || index}>
                <div className="flex flex-col items-center text-center">
                  {/* Image */}
                  <div className="w-full overflow-hidden rounded-xl aspect-[3/4] sm:aspect-auto sm:h-[25rem]">
                    <Image
                      onClick={() =>
                        router.push(`/collection/${category.collectionSlug}`)
                      }
                      src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${category.collectionImage}`}
                      alt={category.collectionName}
                      width={300}
                      height={400}
                      className="object-cover cursor-pointer w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Name */}
                  <Link
                    href={`/collection/${category.collectionSlug}`}
                    className="mt-3 font-semibold text-lg text-gray-900"
                  >
                    {category.collectionName}
                  </Link>
                </div>
              </SwiperSlide>
            ))}

          {/* Navigation buttons */}
          <div className="swiper-button-prev !text-gray-600 !w-8 !h-8 !bg-white !rounded-full shadow-md flex items-center justify-center after:!text-sm hover:!bg-gray-100 absolute top-1/2 -left-4 z-10" />
          <div className="swiper-button-next !text-gray-600 !w-8 !h-8 !bg-white !rounded-full shadow-md flex items-center justify-center after:!text-sm hover:!bg-gray-100 absolute top-1/2 -right-4 z-10" />
        </Swiper>
      </div>
    </section>
  );
};

export default ProductWidget;
