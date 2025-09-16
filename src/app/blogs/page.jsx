"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header/Header";

const Page = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);
    const [isEnd, setIsEnd] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };

    const buttonLabels = ["All Posts", "Success Stories"];

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/content/`
            );
            if (response.ok) {
                const data = await response.json();
                setBlogs(data || []);
            }
        } catch (e) {
            console.error("Failed to fetch blogs", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const metaData = {
        title: `DoorBix || Blogs and Articles`,
        description: `Explore insightful blogs and articles from DoorBix covering the latest trends, tips, and updates to keep you informed and inspired.`,
        image: `https://www.doorbix.com/Image/Logo.png`,
        pageUrl: `https://www.doorbix.com/shop/blogs`,
    };

    // Skeleton card
    const SkeletonCard = () => (
        <div className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="w-full h-[15rem] bg-gray-200" />
            <div className="p-4 space-y-3">
                <div className="h-4 w-24 bg-gray-200 rounded-full" />
                <div className="h-5 w-3/4 bg-gray-200 rounded-md" />
                <div className="h-3 w-full bg-gray-200 rounded-md" />
                <div className="h-10 w-full bg-gray-200 rounded-md" />
            </div>
        </div>
    );

    return (
        <>
            <Header
                title={metaData.title}
                description={metaData.description}
                imageUrl={metaData.image}
                pageUrl={metaData.pageUrl}
            />

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center text-white mb-6"
                style={{ backgroundImage: "url('/Image/bn.png')" }}
            >
                <div className="h-44 md:h-56 lg:h-72" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/30" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-lg leading-tight">
                            DoorBix Blog
                        </h1>
                        <p className="mt-3 max-w-3xl mx-auto text-sm sm:text-base md:text-lg font-medium drop-shadow-md">
                            Expert insights, study tips, and success stories to help you
                            succeed in your aviation journey
                        </p>
                    </div>
                </div>
            </section>

            {/* Search + Category Carousel */}
            <section className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Category buttons */}
                <h3 className="mb-6 text-xl font-semibold text-gray-800">
                    Discover Our Most Popular Articles
                </h3>
                {/* Blog Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                        : blogs && blogs.length
                            ? blogs.map((blog, i) => (
                                <div
                                    key={i}
                                    className="card w-full text-start rounded-lg shadow-sm overflow-hidden bg-white"
                                >
                                    {/* Image */}
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${blog.blogImage}`}
                                        width={300}
                                        height={213}
                                        className="w-full h-[15rem] object-cover"
                                        alt={blog.blogTitle || "blog image"}
                                    />

                                    {/* Card Body */}
                                    <div className="p-4">
                                        <span className="inline-block bg-yellow-400 text-black text-sm px-3 py-1 rounded-full mb-3">
                                            {blog.blogCategory?.name || "Uncategorized"}
                                        </span>
                                        <h5 className="text-lg font-bold">{blog.blogTitle}</h5>
                                        <p className="text-sm text-gray-700 mb-4">
                                            {blog.blogExcerpt?.slice(0, 100) || "No excerpt available."}
                                        </p>
                                        <Link
                                            href={`/blogs/${blog.slug}`}
                                            className="inline-flex items-center justify-center w-full border border-[var(--aero-primary)] text-[var(--aero-primary)] 
                      px-4 py-2 rounded-md hover:bg-blue-400 hover:text-white transition-all"
                                        >
                                            Learn more
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="ms-2 bi bi-arrow-right"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M1 8a.5.5 0 0 
                          1 .5-.5h11.793l-3.147-3.146a.5.5 
                          0 0 1 .708-.708l4 4a.5.5 0 0 
                          1 0 .708l-4 4a.5.5 0 0 
                          1-.708-.708L13.293 8.5H1.5A.5.5 
                          0 0 1 1 8"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))
                            : !loading && (
                                <div className="col-span-full text-center text-gray-600 py-20">
                                    No posts available right now. Check back soon.
                                </div>
                            )}
                </div>
            </section>
        </>
    );
};

export default Page;
