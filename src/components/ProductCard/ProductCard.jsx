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
            <button
                aria-label="Add to wishlist"
                className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500"
                type="button"
            >
                <Heart size={18} />
            </button>

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

                {/* Price */}
                <div className="mt-1">
                    <span className="text-sm font-bold text-black">{product.productPrice} AED</span>
                    {product.productComparePrice && (
                        <span className="ml-2 text-xs text-gray-400 line-through">
                            {product.productComparePrice} AED
                        </span>
                    )}
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
