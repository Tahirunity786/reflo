'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Heart, Truck, ShieldCheck, Badge } from 'lucide-react';
import BestSellingProducts from '../BestSellingProducts/BestSellingProducts';
import PurchaseOptions from '../PurchaseOptions/PurchaseOptions';
import ProductInfoTabs from '../ProductInfoTabs/ProductInfoTabs';

const ProductDetailPage = ({ slug, data }) => {
    const sizes = ['S', 'M', 'L', 'XL'];
    const colors = ['black', 'gray', 'brown'];

    return (
        <section className="max-w-screen-xl mx-auto px-8 py-8 bg-white text-gray-800">
            {/* Breadcrumb */}
            <nav className="text-xs text-gray-400 mb-4">Home / Shop/ {data?.productName}</nav>

            <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
                {/* ================= Left Section (Sticky Images) ================= */}
                <div className="w-full lg:w-[52%] h-[100vh]">

                    <div className="flex flex-col-reverse lg:flex-row gap-4 ">
                        {/* Thumbnails */}
                        <div className="lg:w-1/6 md:w-full overflow-hidden">
                            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto max-h-[500px]">

                                {Array.isArray(data?.productImages) && data.productImages.length > 1 &&
                                    data.productImages.map((img, i) => {
                                        if (!img?.image) return null; // Skip if image is missing

                                        return (
                                            <div
                                                key={i}
                                                className="min-w-[3rem] w-20 h-20 border rounded overflow-hidden flex-shrink-0 cursor-pointer"
                                            >
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${img.image}`}
                                                    alt={`Thumbnail ${i + 1}`}
                                                    width={96}
                                                    height={80}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        );
                                    })
                                }

                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="relative w-full aspect-[4/5] bg-gray-100 rounded overflow-hidden">
                            {data?.productImages?.[0]?.image && (
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${data.productImages[0].image}`}
                                    alt="Faux fur gilet"
                                    fill
                                    className="object-cover rounded"
                                />
                            )}

                            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* ================= Right Section (Product Info) ================= */}
                <div className="w-full lg:w-[48%] space-y-5">
                    {/* Info Card */}
                    <div className="bg-white z-10 pb-6">
                        {/* Top Label */}
                        {/* <div className="flex items-center justify-between mb-2">
                            <span className="bg-yellow-300 text-xs px-2 py-1 rounded font-semibold">
                                Subscription
                            </span>
                        </div> */}

                        {/* Title */}
                        <h1 className="text-2xl font-semibold mb-2">{data?.productName}</h1>

                        {/* Rating */}
                        
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="fill-yellow-400" />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">1 review</span>
                            <div className="text-red-500 text-md">22 added in last 24 hours</div>
                        </div>

                        {/* Price */}
                        <div className="mb-4 flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-black">
                                ${data?.productPrice}
                            </span>
                            {data?.productComparePrice && (
                                <del className="text-gray-500">
                                    ${data.productComparePrice}
                                </del>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-md leading-relaxed mb-4">
                            The custom long-sleeved jacket with fur-like features adds a classic crew neckline,
                            easy short sleeves, a slightly cropped length and a box-cut fit for a truly timeless
                            look.
                        </p>

                        {/* Benefits */}
                        <ul className="text-sm space-y-2 border rounded-lg p-5 mb-3">
                            <li className="flex items-center gap-2 text-gray-600 text-md">
                                <Truck size={20} /> Estimate delivery times: 3-5 days International.
                            </li>
                            <li className="flex items-center gap-2 text-gray-600 text-md">
                                <Badge size={20} /> Use code <b>WELCOME15</b> for 15% off your first order.
                            </li>
                            <li className="flex items-center gap-2 text-gray-600 text-md">
                                <ShieldCheck size={20} /> Secure checkout guarantee
                            </li>
                        </ul>

                        {/* Variant Selectors */}

                        {
                            data?.productVariant && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Size Selector */}
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">Size</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    className="shadow-sm cursor-pointer px-4 py-1 rounded hover:bg-black hover:text-white text-sm"
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Color Selector */}
                                    <div>
                                        <h4 className="text-sm font-medium mb-1">Color</h4>
                                        <div className="flex gap-2">
                                            {colors.map((color) => (
                                                <span
                                                    key={color}
                                                    className={`w-5 h-5 rounded-full border cursor-pointer ${color === 'black'
                                                        ? 'bg-black border-black'
                                                        : color === 'gray'
                                                            ? 'bg-gray-400 border-gray-400'
                                                            : 'bg-yellow-700 border-yellow-700'
                                                        }`}
                                                ></span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>

                    {/* Purchase Actions */}
                    <div className="space-y-3">
                        <PurchaseOptions />
                    </div>

                    {/* Extra Info */}
                    <div className="space-y-3 text-sm text-gray-700">
                        <p>
                            <b>SKU</b>: {data?.productSKU}
                        </p>
                        <p>
                            <b>Available</b>: {data.stock <= 0 ? (<span className='text-red-600'>Out of Stock</span>) : (<span className='text-green-700'>In of Stock</span>)}
                        </p>
                    </div>
                </div>
            </div>
            <ProductInfoTabs />

            {/* ================= More Products ================= */}
            <BestSellingProducts />
        </section>
    );
};

export default ProductDetailPage;
