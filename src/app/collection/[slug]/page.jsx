"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Star, LayoutGrid, List } from "lucide-react";
import CollectCard from "@/components/CollectCard/CollectCard";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard/ProductCard";
import Header from "@/components/Header/Header";

const cn = (...classes) => classes.filter(Boolean).join(" ");



const Page = () => {
    const [layout, setLayout] = useState("grid");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const params = useParams();


    useEffect(() => {
        const retriveCollection = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/collections/${params.slug}`);
                if (response.ok) {
                    const RCData = await response.json();
                    setData(RCData);
                }
                setLoading(false)

            } catch (e) {
                console.error(e)
                setLoading(false)

            }

        }
        retriveCollection()
    }, [])

    const handleLayoutChange = (view) => {
        setLoading(true);
        setTimeout(() => {
            setLayout(view);
            setLoading(false);
        }, 300);
    };

    const metaData = {
        title: `DoorBix || ${data?.collectionName}`,
        description: `${data?.collectionDescription}`,
        image: `${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${data?.collectionImage}`,
        pageUrl: `https://wwww.doorbix.com/shop/${data?.collectionSlug}`,
    }

    return (
        <section className="bg-white px-4 py-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto">
            <Header title={metaData.title} description={metaData.description} imageUrl={metaData.image} pageUrl={metaData.pageUrl} />

            {/* Banner */}
            <div
                className="relative h-[200px] md:h-[300px] w-full mb-10 bg-cover bg-center rounded-lg overflow-hidden"
                style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_MEDIA_URL}${data?.collectionImage})` }}
            >

                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
                    <h1 className="text-2xl md:text-4xl font-bold">{data?.collectionName}</h1>
                    <p className="text-sm md:text-base mt-2">{data?.collectionDescription}</p>
                </div>
            </div>



            <div className="flex gap-8">
                {/* Sidebar Filter */}
                <aside className="w-full md:w-[250px] flex-shrink-0 hidden md:block">
                    <div className="space-y-6 p-4 bg-gray-50 rounded-lg ">
                        <div>
                            <h4 className="text-base font-semibold mb-3 pb-2">Product Categories</h4>
                            <ul className="text-sm space-y-2 text-gray-700">
                                <li className="cursor-pointer hover:text-black">Crop-top</li>
                                <li className="cursor-pointer hover:text-black">Sweaters</li>
                                <li className="cursor-pointer hover:text-black">T-Shirts</li>
                                <li className="cursor-pointer hover:text-black">Jean</li>
                                <li className="cursor-pointer hover:text-black">Coats</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-base font-semibold mb-3 pb-2">Availability</h4>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm text-gray-700">
                                    <input type="checkbox" className="accent-black" />
                                    <span>In stock</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-base font-semibold mb-3 pb-2">Price Range</h4>
                            <input type="range" min={0} max={500} className="w-full accent-black" />
                            <div className="text-sm text-gray-700 mt-1">0 {process.env.NEXT_PUBLIC_CURRENCY} - 500 {process.env.NEXT_PUBLIC_CURRENCY} </div>
                        </div>
                    </div>
                </aside>

                {/* Main Product Section */}
                <div className="flex-1">
                    {/* Product Listing Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                        <p className="text-sm text-gray-600">There are {data?.products?.length} results in total</p>

                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleLayoutChange("grid")}
                                    className={cn("p-2 border rounded", layout === "grid" && "bg-black text-white")}
                                    aria-label="Grid view"
                                >
                                    <LayoutGrid size={16} />
                                </button>
                                <button
                                    onClick={() => handleLayoutChange("list")}
                                    className={cn("p-2 border rounded", layout === "list" && "bg-black text-white")}
                                    aria-label="List view"
                                >
                                    <List size={16} />
                                </button>
                            </div>

                            <div>
                                <label className="text-sm font-medium mr-2">Sort by:</label>
                                <select className="text-sm border border-gray-300 rounded px-2 py-1">
                                    <option>Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Loader */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin h-6 w-6 border-4 border-black border-t-transparent rounded-full"></div>
                        </div>
                    ) : (
                        <div
                            className={cn(
                                "transition-all duration-300",
                                layout === "grid"
                                    ? "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    : "flex flex-col gap-6"
                            )}
                        >
                            {data?.products?.map((product) => (
                                <ProductCard key={product.id} product={product} isList={layout === "list"} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Page;
