"use client";

import React, { useState, useEffect } from "react";
import { LayoutGrid, List } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard/ProductCard";
import Header from "@/components/Header/Header";
import ProductFilters from "@/components/ProductFilters/ProductFilters";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const getOrderingParam = (value) => {
    switch (value) {
        case "alphabet-asc":
            return "productName"; // ascending A-Z
        case "price-asc":
            return "productPrice"; // low → high
        case "price-desc":
            return "-productPrice"; // high → low
        case "newest":
        default:
            return "-productCreatedAt"; // newest first
    }
};


const Page = () => {
    const [layout, setLayout] = useState("grid");
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("price-asc");
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


    const fetchProducts = async (selectedFilter) => {
        try {
            setLoading(true)
            const ordering = getOrderingParam(selectedFilter);

            const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/search/`);
            url.searchParams.append("ordering", ordering);

            const res = await fetch(url.toString(), {
                method: "GET",
                // credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                // cache: "no-store",
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch products: ${res.status}`);
            }

            const data = await res.json();

            setData((prev) => ({
                ...prev,
                products: data.products || data, // ✅ only replace products
            }));
        } catch (err) {
            console.error("Error fetching products:", err);
        }finally{
            setLoading(false)
        }
    };

    const handleChange = (e) => {
        const selected = e.target.value;
        setFilter(selected);
        fetchProducts(selected);
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
                <ProductFilters pData={data} setPData={setData} seLoading={setLoading} />

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
                                <select
                                    className="text-sm border border-gray-300 rounded px-2 py-1"
                                    value={filter}
                                    onChange={handleChange}
                                >
                                    <option value="alphabet-asc">Alphabet: A to Z</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="newest">Newest</option>
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
