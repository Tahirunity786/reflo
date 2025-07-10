"use client";

import { useState } from "react";

export default function ProductDetail() {
    const [quantity, setQuantity] = useState(1);

    // Example product data
    const product = {
        name: "Custom Motorcycle",
        image: "/Image/b1f5ff0efaddf79447cd22ace6d7b1ff.jpg_2200x2200q80.jpg_.webp", // Replace with real path in /public/
        originalPrice: 2000,
        salePrice: 1900,
        category: "Popular Item",
        tag: "Automobiles",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    };

    // Handle quantity input change
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setQuantity(Math.max(1, value));
    };

    return (
        <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left/Main Column */}
            <div className="lg:col-span-2 space-y-6 bg-white p-6">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500">
                    Theme Freesia Sites &gt; Shopping Cart &gt; Products &gt;{" "}
                    <span className="text-black font-medium">{product.name}</span>
                </nav>

                {/* Product Section */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Image + Sale Badge */}
                    <div className="relative">
                        {/* <span className="absolute top-0 -left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              Sale!
            </span> */}
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full max-w-md object-contain h-[320px]"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                        <h1 className="text-2xl font-semibold">{product.name}</h1>

                        {/* Pricing */}
                        <div className="flex items-center gap-4 text-lg">
                            <span className="line-through text-gray-400">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-orange-600 font-semibold">
                                ${product.salePrice.toFixed(2)}
                            </span>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-16 px-2 py-1 border rounded text-center"
                            />
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                                Add to cart
                            </button>
                        </div>

                        {/* Wishlist Button */}
                        <button className="border text-orange-500 border-orange-500 px-4 py-2 rounded hover:bg-orange-50 flex items-center gap-2">
                            <span>♡</span> Add to Wishlist
                        </button>

                        {/* Category & Tags */}
                        <div className="text-sm text-gray-600 space-y-1">
                            <div>
                                <strong>Category:</strong> {product.category}
                            </div>
                            <div>
                                <strong>Tag:</strong> {product.tag}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Tabs */}
                <div className="mt-10">
                    <div className="border-b text-sm flex justify-start items-center gap-2">
                        <button className="border-b-2 border-orange-500 px-4 py-2 font-medium text-black">
                            Description
                        </button>
                        <button className="border-b-2 border-orange-500 px-4 py-2 font-medium text-black">
                            Reviews
                        </button>
                    </div>

                    <div className="mt-4 text-gray-700 text-sm leading-relaxed">
                        <h2 className="text-lg font-semibold mb-2">Description</h2>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8 bg-white p-6">
                {/* Product Categories */}
                <div className=" p-4 rounded shadow-sm">
                    <h3 className="font-semibold text-sm border-b pb-2 mb-2">
                        Shipping
                    </h3>

                </div>

                {/* Product Suggestions */}
                <div className="p-4 rounded shadow-sm">
                    <h3 className="font-semibold text-sm border-b pb-2 mb-2">PRODUCTS</h3>
                    <div className="space-y-4 text-sm">
                        {/* Product 1 */}
                        <div className="flex gap-4 items-center">
                            <img src="/dumbbell.jpg" alt="Dumbbell" className="w-12 h-12" />
                            <div>
                                <div className="font-semibold">Dumbbell</div>
                                <div className="text-orange-600 font-medium">
                                    $77.00{" "}
                                    <span className="line-through text-gray-400 text-xs ml-1">
                                        $99.00
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Product 2 */}
                        <div className="flex gap-4 items-center">
                            <img
                                src="/flare-skirt.jpg"
                                alt="Flare Skirts"
                                className="w-12 h-12"
                            />
                            <div>
                                <div className="font-semibold">Flare Skirts</div>
                                <div className="text-orange-600 font-medium">$89.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
