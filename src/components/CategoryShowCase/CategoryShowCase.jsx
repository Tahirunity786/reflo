'use client'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

// Reusable hero banner data array (will be replaced with fetched posts)
const banners = [
  {
    title: 'Trendy Fashion',
    subtitle: 'Learn more about trending fashion around the world.',
    image: '/Image/fs_new_s1.webp',
  },
  {
    title: 'Confident Looks',
    subtitle: 'LIMITED TIME ONLY',
    image: '/Image/fs_new_s1.webp',
  },
  {
    title: 'Classic Styles',
    subtitle: 'YOUR PERFECT OUTFIT',
    image: '/Image/fs_new_s1.webp',
  },
  {
    title: 'Bold Statements',
    subtitle: 'STAND OUT TODAY',
    image: '/Image/fs_new_s1.webp',
  },
];

export default function CategoryShowCase() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogCategoryPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/content?category_wise=true`);
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (e) {
        console.error("Failed to fetch posts:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogCategoryPost();
  }, []);

  const displayItems = loading ? Array(4).fill(null) : posts.length ? posts : banners;

  return (
    <section className="py-12 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
        >
          {displayItems.map((item, index) => (
            <SwiperSlide key={index}>
              {loading ? (
                <LoadingCard />
              ) : (
                <BannerCard banner={item} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// Single banner card component (reusable)
function BannerCard({ banner }) {
  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden group shadow-md">
      <Image
        src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${banner.blogImage}`}
        alt={banner.blogTitle}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
        <p className="text-xs tracking-widest mb-1 uppercase">{banner.blogExcerpt}</p>
        <h2 className="text-2xl font-semibold mb-4">{banner.blogTitle}</h2>
        <button className="bg-white text-black text-sm font-medium px-5 py-2 rounded-full shadow-md hover:bg-gray-100 transition">
          Learn More
        </button>
      </div>
    </div>
  );
}

// Skeleton loader card
function LoadingCard() {
  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden bg-gray-200 animate-pulse shadow-md">
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>
        <div className="h-8 w-28 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
