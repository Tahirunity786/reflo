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
  const [pData, setPData] = useState({ products: [], collections: [], categories: [] });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("price-asc");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const router = useRouter();

  const type = params.get("type");
  const search = params.get("search");

  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60); // 12 hours in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // ⏱ Format HH:MM:SS
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };


  const handleLayoutChange = (view) => {
    setLoading(true);
    setTimeout(() => {
      setLayout(view);
      setLoading(false);
    }, 300);
  };

  const fetchProducts = async (pageNum = 1, selectedFilter = filter, searchTerm = search, productType = type) => {
    try {
      setLoading(true);
      const ordering = getOrderingParam(selectedFilter);

      const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/products/`);
      url.searchParams.append("collection", 4);
      url.searchParams.append("category", true);
      url.searchParams.append("page", pageNum);

      if (ordering) url.searchParams.append("ordering", ordering);
      if (searchTerm) url.searchParams.append("search", searchTerm);
      if (productType) url.searchParams.append("type", productType);

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

      const data = await res.json();

      setPData({
        products: data.results?.products || [],
        collections: data.results?.collections || [],
        categories: data.results?.categories || [],
      });

      setTotalCount(data.count || 0);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setPage(pageNum);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  useEffect(() => {
    if (search && type) {
      fetchProducts(1, filter, search, type);
    }
  }, [search, type]);

  const handleChange = (e) => {
    const selected = e.target.value;
    setFilter(selected);
    fetchProducts(1, selected);
  };

  const handleNext = () => {
    if (nextPage) fetchProducts(page + 1);
  };

  const handlePrev = () => {
    if (prevPage) fetchProducts(page - 1);
  };

  const totalPages = Math.ceil(totalCount / (pData.products?.length || 1));

  const metaData = {
    title: `DoorBix || Shop Now`,
    description: `Shop the latest collection at DoorBix. Discover a wide range of quality products designed to bring style, value, and convenience to your shopping experience.`,
    image: `https://www.doorbix.com/Image/Logo.png`,
    pageUrl: `https://www.doorbix.com/shop/shop`,
  };

  return (
    <section className="bg-white px-4 py-6 md:px-8 lg:px-12 max-w-screen-xl mx-auto">
      <Header
        title={metaData.title}
        description={metaData.description}
        imageUrl={metaData.image}
        pageUrl={metaData.pageUrl}
      />

      {/* <CollectionGrid pData={pData} /> */}

      <div className="flex gap-8">
        {/* Sidebar Filter */}
        <ProductFilters pData={pData} setPData={setPData} seLoading={setLoading} />

        {/* Main Product Section */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-center justify-start gap-4 w-full mb-6">
            <h1 className="font-bold text-3xl sm:text-4xl mb-4 sm:mb-0">
              Flash Sale
            </h1>

            <div className="bg-red-600 text-white font-semibold px-6 py-2 rounded-[29px] border border-white text-lg sm:text-xl">
              {formatTime(timeLeft)}
            </div>
          </div>
          {/* Product Listing Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <p className="text-sm text-gray-600">
              Showing page {page} of {totalPages} ({totalCount} results)
            </p>

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
            <>
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={handlePrev}
                    disabled={!prevPage}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={!nextPage}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
