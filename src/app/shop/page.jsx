"use client";

import React, { useState, useEffect } from "react";
import { LayoutGrid, List } from "lucide-react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header/Header";
import ProductFilters from "@/components/ProductFilters/ProductFilters";
import CollectionGrid from "@/components/CollectionGrid/CollectionGrid";

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
  const params = useSearchParams();
  const [layout, setLayout] = useState("grid");
  const [pData, setPData] = useState({ products: [], collections: [] });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("price-asc");
  const router = useRouter();

  // params declaration
  const type = params.get("type");
  const search = params.get("search");

  const handleLayoutChange = (view) => {
    setLoading(true);
    setTimeout(() => {
      setLayout(view);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/products?collection=4&category=true`)

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json()

        setPData({
          products: data.products,
          collections: data.collections,
          categories: data.categories
        });

      } catch (error) {
        console.error("Error fetching product or collection data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);


  const fetchProducts = async (selectedFilter, search, type) => {
    console.log("I'm calling.")
    try {
      setLoading(true);
      const ordering = getOrderingParam(selectedFilter);

      const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/search/`);
      if (ordering) url.searchParams.append("ordering", ordering);
      if (search) url.searchParams.append("search", search);
      if (type) url.searchParams.append("type", type);


      const res = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }

      const data = await res.json();

      setPData((prev) => ({
        ...prev,
        products: data.results || data,
      }));
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search && type) {
      console.log("Here is search type: ",search, type)
      fetchProducts(null, search, type);
    }
  }, [search, type]);


  const handleChange = (e) => {
    console.log("I'm calling.")
    const selected = e.target.value;
    setFilter(selected);
    fetchProducts(selected);
  };

  const metaData = {
    title: `DoorBix || Shop Now`,
    description: `Shop the latest collection at DoorBix. Discover a wide range of quality products designed to bring style, value, and convenience to your shopping experience.`,
    image: `https://www.doorbix.com/Image/Logo.png`,
    pageUrl: `https://www.doorbix.com/shop/shop`,
  }



  return (
    <section className="bg-white px-4 py-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto">
      <Header title={metaData.title} description={metaData.description} imageUrl={metaData.image} pageUrl={metaData.pageUrl} />

      {/* Banner */}
      {/* <div
        className="relative h-[200px] md:h-[300px] w-full mb-10 bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: "url('/images/sweater-banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold">Sweaters</h1>
          <p className="text-sm md:text-base mt-2">Cozy and chic for any season.</p>
        </div>
      </div> */}
      {/* Collect card */}
      <CollectionGrid pData={pData}/>


      <div className="flex gap-8">
        {/* Sidebar Filter */}

        <ProductFilters pData={pData} setPData={setPData} seLoading={setLoading} />

        {/* Main Product Section */}
        <div className="flex-1">
          {/* Product Listing Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <p className="text-sm text-gray-600">There are {pData?.products?.length} results in total</p>

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
              {pData?.products?.map((product) => (
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
