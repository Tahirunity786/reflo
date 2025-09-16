"use client";

import React, { useState, useRef, useEffect } from 'react'

// import Header from '@/components/Header/Header';
// import styles from './blog.module.css'
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import Header from '@/components/Header/Header';


const Page = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);
    const [isEnd, setIsEnd] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const [blogs, setBlogs] = useState([]);


    const handleButtonClick = (index) => {
        setActiveIndex(index); // Update the active button index
    };
    const handleSlideChange = (swiper) => {
        setIsEnd(swiper.isEnd);
        setIsBeginning(swiper.isBeginning);
    };
    const buttonLabels = [
        "All Posts",
        "Success Stories"
    ];

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/blog/content/`);
            if (response.ok) {
                const data = await response.json();
                setBlogs(data || [])
            }

        } catch (e) {

        }
    }
    useEffect(() => {
        fetchBlogs()
    }, []);


    const metaData = {
        title: `DoorBix || Blogs and Articles`,
        description: `Explore insightful blogs and articles from DoorBix covering the latest trends, tips, and updates to keep you informed and inspired.`,
        image: `https://www.doorbix.com/Image/Logo.png`,
        pageUrl: `https://www.doorbix.com/shop/blogs`,
    }


    return (
        <>
            <Header title={metaData.title} description={metaData.description} imageUrl={metaData.image} pageUrl={metaData.pageUrl} />

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center py-16 text-white h-[250px]"
                style={{ backgroundImage: "url('/Image/bn.png')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 bg-opacity-50"></div>

                <div className="container mx-auto text-center px-4 relative z-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
                        DoorBix Blog
                    </h1>
                    <h2 className="mt-4 font-medium sm:text-base md:text-lg drop-shadow-md">
                        Expert insights, study tips, and success stories to help you succeed in your
                        aviation journey
                    </h2>
                </div>
            </section>

            {/* Search + Category Carousel */}
            <section className="container mb-12 max-w-5xl">


                {/* Blog Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-16">
                    {blogs.map((_, i) => (
                        <div key={i} className="card w-full text-start  rounded-lg shadow-sm overflow-hidden">
                            {/* Image */}
                            <Image
                                src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${_.blogImage}`}
                                width={300}
                                height={213}
                                className="w-full h-[15rem] object-cover"
                                alt='blog image'
                            />

                            {/* Card Body */}
                            <div className="p-4">
                                <span className="inline-block bg-yellow-400 text-black text-sm px-3 py-1 rounded-full mb-3">{_.blogCategory.name}</span>
                                <h5 className="text-lg font-bold">{_.blogTitle}</h5>
                                <p className="text-sm text-gray-700 mb-4">
                                    {_.blogExcerpt}
                                </p>
                                <a href={`/blogs/${_.slug}`}
                                    className="inline-flex items-center justify-center w-full border border-[var(--aero-primary)] text-[var(--aero-primary)] 
                                px-4 py-2 rounded-md hover:bg-blue-400 hover:text-white transition-all"
                                >
                                    Learn more
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="ms-2 bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 
                                        1 .5-.5h11.793l-3.147-3.146a.5.5 
                                        0 0 1 .708-.708l4 4a.5.5 0 0 
                                        1 0 .708l-4 4a.5.5 0 0 
                                        1-.708-.708L13.293 8.5H1.5A.5.5 
                                        0 0 1 1 8" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </>
    )
}

export default Page