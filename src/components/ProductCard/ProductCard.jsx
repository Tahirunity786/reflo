"use client";
import { Heart, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItemSafe } from "@/redux/slices/cartSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaShoppingBasket } from "react-icons/fa";
import WishButton from "../WishButton/WishButton";


const cn = (...classes) => classes.filter(Boolean).join(" ");

const ProductCard = ({ product, isList }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);


    const addToCartItem = () => {
        const exists = items.find((i) => i.id === product.id);

        if (exists) {
            toast("Item is already in your cart!", {
                icon: <FaShoppingBasket className="text-black" />, // ✅ custom basket icon
            });
            return;
        }

        const item = {
            id: product.id,
            slug: product.productSlug,
            name: product.productName,
            price: product.productPrice,
            unite_price: product.productPrice,
            image: product?.productImages?.[0]?.image
                ? `${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${product.productImages[0].image}`
                : null,
            qty: 1,
        };

        dispatch(addItemSafe(item));

        toast("Added to cart!", {
            icon: <FaShoppingBasket className="text-black" />, // optional: show basket icon here too
        });
    };
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
            <WishButton data={product} />

            {/* Image */}
            <div
                className={cn(
                    "relative bg-gray-100 transition-all duration-300",
                    isList ? "w-full md:w-1/3 aspect-[3/2]" : "w-full aspect-[6/5]"
                )}
            >
                <Image
                    src={`${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${product.productImages[0]?.image}`}
                    alt={product.productName}
                    fill
                    onClick={() => {
                        router.push(`/shop/${product.productSlug}`);
                    }}
                    className="object-cover cursor-pointer"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                />
            </div>

            {/* Content */}
            <div className="p-4 text-left flex-1">
                <h3
                    className="text-sm font-semibold text-gray-900 line-clamp-2 cursor-pointer"
                    onClick={() => {
                        router.push(`/shop/${product.productSlug}`);
                    }}
                >
                    {product.productName}
                </h3>
                {/* Rating */}
                <div className="flex items-center mt-2.5 mb-4">
                    {product?.average_rating ? (
                        <>
                            <div className="flex items-center space-x-1">
                                {[...Array(Math.floor(product?.average_rating))].map((_, i) => (
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
                                {[...Array(5 - Math.floor(product?.average_rating))].map((_, i) => (
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
                                {product?.average_rating}
                            </span>
                        </>
                    ) : (
                        null
                    )}
                </div>


                {product.productComparePrice && (
                    <>
                        <div className='space-x-3'>
                            <span className="line-through text-gray-400 text-sm">
                                {parseFloat(product.productComparePrice)} {process.env.NEXT_PUBLIC_CURRENCY}
                            </span>
                            <span className="text-green-600 text-sm font-semibold">
                                {Math.round(
                                    ((product.productComparePrice - product.productPrice) /
                                        product.productComparePrice) *
                                    100
                                )}
                                % OFF
                            </span>
                        </div>
                    </>
                )}
                {/* Price */}
                <div className="mt-1">
                    <span className="text-sm font-bold text-black">{product.productPrice} {process.env.NEXT_PUBLIC_CURRENCY}</span>
                   
                </div>


                {/* Add to Cart */}
                <button
                    type="button"
                    onClick={addToCartItem}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition"
                    aria-label="Add to cart"
                >
                    <ShoppingCart size={16} /> Add to Cart
                </button>
            </div>
        </div>
    );
};

export default React.memo(ProductCard);
