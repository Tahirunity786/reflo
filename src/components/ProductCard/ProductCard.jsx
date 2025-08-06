"use client";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const ProductCard = ({ product, isList }) => {
    const router = useRouter()
    return (
        <div
            className={cn(
                "group relative overflow-hidden border border-gray-200 rounded-lg bg-white transition-all duration-300 hover:shadow-lg",
                isList && "flex flex-col md:flex-row gap-4"
            )}
        >
            {/* Discount / Label */}
            {product?.discount && (
                <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {product.discount}
                </span>
            )}
            {product.label && !product.discount && (
                <span className="absolute top-3 left-3 z-10 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded">
                    {product.label}
                </span>
            )}

            {/* Wishlist Icon */}
            <button className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500">
                <Heart size={18} />
            </button>

            {/* Image */}
            <div
                className={cn(
                    "relative bg-gray-100 transition-all duration-300",
                    isList
                        ? "w-full md:w-1/3 aspect-[3/2]"
                        : "w-full aspect-[6/5]" // slightly shorter image in grid view
                )}
            >
                <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${product.productImages[0]?.image}`}
                    alt={product.productName}
                    fill
                    onClick={()=>{router.push(`/shop/${product.productSlug}`)}}
                    className="object-cover cursor-pointer"
                />
            </div>


            {/* Content */}
            <div className="p-4 text-left flex-1">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 cursor-pointer" onClick={()=>{router.push(`/shop/${product.productSlug}`)}}>
                    {product.productName}
                </h3>

                {/* Rating */}
                {/* <div className="flex items-center gap-1 my-1">
                    {[...Array(product.rating)].map((_, i) => (
                        <Star
                            key={i}
                            size={14}
                            className="text-yellow-400 fill-yellow-400"
                        />
                    ))}
                </div> */}

                {/* Price */}
                <div className="mt-1">
                    <span className="text-sm font-bold text-black">
                        {product.productPrice} AED
                    </span>
                    {product.productComparePrice && (
                        <span className="ml-2 text-xs text-gray-400 line-through">
                            {product.productComparePrice} AED
                        </span>
                    )}
                </div>

                {/* Countdown */}
                {/* {product.countdown && (
                    <span className="block text-xs text-white text-center bg-red-500 py-1 px-2 mt-2 rounded">
                        {product.countdown}
                    </span>
                )} */}

                {/* Variants */}
                {/* <div className="flex gap-2 mt-2">
                    {product.variants.map((variant, index) => (
                        <span
                            key={index}
                            className={cn(
                                "w-4 h-4 rounded-full border",
                                variant === "gray" && "bg-gray-400 border-gray-400",
                                variant === "blue" && "bg-blue-500 border-blue-500",
                                variant === "black" && "bg-black border-black",
                                variant === "beige" && "bg-yellow-200 border-yellow-200",
                                variant === "brown" && "bg-yellow-700 border-yellow-700",
                                variant === "white" && "bg-white border-gray-300"
                            )}
                        ></span>
                    ))}
                </div> */}

                {/* Add to Cart */}
                <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition">
                    <ShoppingCart size={16} /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);