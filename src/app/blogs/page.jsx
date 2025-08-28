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
                className="bg-black/80 h-[248px] text-white w-full mb-12 flex flex-col justify-center items-center"
            >
                <div className="container mx-auto text-center">
                    <h2 className="text-2xl font-bold">DoorBix Blog</h2>
                    <p className="font-bold sm:text-sm ">
                        Expert Insights, study tips, and success stories to help you succeed in your aviation
                        <br /> journey
                    </p>
                </div>
            </section>
            {/* Search + Category Carousel */}
            <section className="container mx-auto mb-12">
                <div className="flex flex-wrap justify-between items-center mb-12 gap-4 px-16">

                    {/* Search Box */}
                    <div className="relative pr-5 w-full md:w-auto">
                        {/* Search Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16" height="16"
                            fill="currentColor"
                            className="absolute top-2.5 left-5 text-gray-500"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 
          3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 
          1 0 0 0-.115-.1zM12 
          6.5a5.5 5.5 0 1 1-11 0 
          5.5 5.5 0 0 1 11 0" />
                        </svg>
                        <input
                            type="search"
                            id="search"
                            placeholder="Search article"
                            className="form-input pl-12 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--aero-primary)]"
                        />
                    </div>

                    {/* Swiper Carousel */}
                    <div className="relative flex-1">
                        <Swiper
                            modules={[FreeMode]}
                            freeMode={true}
                            slidesPerView="auto"
                            spaceBetween={15}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            onSlideChange={handleSlideChange}
                            className="mySwiper"
                        >
                            {buttonLabels.map((label, index) => (
                                <SwiperSlide key={index} className="!w-auto">
                                    <button
                                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${activeIndex === index
                                            ? "bg-blue-400 text-white border-blue-400"
                                            : "border-blue-400 text-black hover:bg-blue-400 hover:text-white"
                                            }`}
                                        onClick={() => handleButtonClick(index)}
                                    >
                                        {label}
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Left Nav Button */}
                        <button
                            className={`absolute left-[-35px] top-1/2 -translate-y-1/2 p-2 bg-blue-400 shadow-md rounded-full border 
          ${isBeginning ? "hidden" : ""}`}
                            onClick={() => swiperRef.current?.slidePrev()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" fill="currentColor"
                                className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 
            0 1 0-.708-.708l-4 4a.5.5 0 0 
            0 0 .708l4 4a.5.5 0 0 
            0 .708-.708L2.707 8.5H14.5A.5.5 0 
            0 0 15 8" />
                            </svg>
                        </button>

                        {/* Right Nav Button */}
                        <button
                            className={`absolute right-[-35px] top-1/2 -translate-y-1/2 p-2 bg-blue-400 shadow-md rounded-full border 
          ${isEnd ? "hidden" : ""}`}
                            onClick={() => swiperRef.current?.slideNext()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" fill="currentColor"
                                className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 
            1 .5-.5h11.793l-3.147-3.146a.5.5 
            0 0 1 .708-.708l4 4a.5.5 0 0 
            1 0 .708l-4 4a.5.5 0 0 
            1-.708-.708L13.293 8.5H1.5A.5.5 
            0 0 1 1 8" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Blog Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-16">
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