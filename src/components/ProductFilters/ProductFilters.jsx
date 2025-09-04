"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

/**
 * FilterableSidebar + product fetch logic
 *
 * - Keeps collections & categories in pData intact (only replaces products)
 * - Debounces the search input
 * - Sends multiple `category` params as repeated params: ?category=id1&category=id2
 * - Sends in_stock as "true" or omits it if not selected
 * - Sends min_price & max_price when provided
 * - Sends name (search keyword) when provided
 * - Sends ordering
 */

export default function ProductFilters({ pData, setPData, seLoading }) {
    // Filter state
    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [inStockOnly, setInStockOnly] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);
    const [searchKeyword, setSearchKeyword] = useState("");
    // const [ordering, setOrdering] = useState(initialOrdering);

    // debounce
    const searchDebounceRef = useRef(null);

    // Build & call API with current filter state
    const fetchFilteredProducts = useCallback(async (opts = {}) => {
        try {
            seLoading(true)

            // build URL + params
            const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/search/`);

            // repeated category params: category=<id>&category=<id>
            if (selectedCategories.size > 0) {
                Array.from(selectedCategories).forEach((catId) => {
                    url.searchParams.append("category", catId);
                });
            }

            // availability
            if (inStockOnly) {
                url.searchParams.append("in_stock", "true");
            }

            // price range (only add if set)
            if (minPrice !== null && minPrice !== "") url.searchParams.append("min_price", String(minPrice));
            if (maxPrice !== null && maxPrice !== "") url.searchParams.append("max_price", String(maxPrice));

            // search keyword
            if (searchKeyword && searchKeyword.trim() !== "") {
                url.searchParams.append("name", searchKeyword.trim());
            }

            // fetch (public product list — no credentials)
            const res = await fetch(url.toString(), {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-store", // ensure fresh
            });

            if (!res.ok) {
                console.error("Failed to fetch products", res.status, await res.text());
                return;
            }

            const data = await res.json();
            // preserve existing collections/categories — only update products
            setPData((prev) => ({
                ...prev,
                products: data.results || data,
            }));
        } catch (err) {
            console.error("Error fetching filtered products:", err);
        }
        finally{
            seLoading(false)
        }
    }, [selectedCategories, inStockOnly, minPrice, maxPrice, searchKeyword, setPData]);

    // When a filter changes, call fetch with a debounce for the text box
    // useEffect(() => {
    //     // debounce for search (400ms) — resets on every change
    //     if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    //     // We still want immediate fetch for checkbox/slider changes, but debounced is okay too.
    //     searchDebounceRef.current = setTimeout(() => {
    //         fetchFilteredProducts();
    //     }, 300);

    //     return () => {
    //         if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    //     };
    // }, [selectedCategories, inStockOnly, minPrice, maxPrice, searchKeyword, fetchFilteredProducts]);

    // Handlers
    const toggleCategory = (categoryId) => {
        setSelectedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(categoryId)) next.delete(categoryId);
            else next.add(categoryId);
            return next;
        });
    };

    const handleInStockToggle = (e) => {
        setInStockOnly(e.target.checked);
    };

    const handleMinPriceChange = (e) => {
        const val = Number(e.target.value || 0);
        setMinPrice(val);
    };

    const handleMaxPriceChange = (e) => {
        const val = Number(e.target.value || 500);
        setMaxPrice(val);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };



    const [expanded, setExpanded] = useState(false);

    const categories = Array.isArray(pData.categories) ? pData.categories : [];
    const visibleCategories = expanded ? categories : categories.slice(0, 7);

    // A quick "reset filters" helper
    const resetFilters = () => {
        setSelectedCategories(new Set());
        setInStockOnly(false);
        setMinPrice(0);
        setMaxPrice(500);
        setSearchKeyword("");
        // setOrdering(initialOrdering);
        // immediate refetch after reset
        setTimeout(() => fetchFilteredProducts(), 0);
    };

    return (
        <aside className="w-full md:w-[250px] flex-shrink-0 hidden md:block">
            <div className="space-y-6 p-4 bg-gray-50 rounded-lg ">
                <div>
                    <h4 className="text-base font-semibold mb-3 pb-2">Search</h4>
                    <input
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        placeholder="Search product name..."
                        className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                    />
                </div>

                <div>
                    <h4 className="text-base font-semibold mb-3 pb-2">Product Categories</h4>
                    <ul
                        className={`space-y-2 transition-all duration-500 ease-in-out overflow-hidden`}
                        style={{ maxHeight: expanded ? `${categories.length * 40}px` : "280px" }} // 40px ≈ li height
                    >
                        {visibleCategories.map((category) => {
                            const checked = selectedCategories.has(category.id);
                            return (
                                <li
                                    key={category.id}
                                    className="cursor-pointer hover:text-black flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        id={`category-${category.id}`}
                                        value={category.id}
                                        checked={checked}
                                        onChange={() => {toggleCategory(category.id);}}
                                        className="cursor-pointer"
                                    />
                                    <label
                                        htmlFor={`category-${category.id}`}
                                        className="cursor-pointer"
                                    >
                                        {category.categoryName}
                                    </label>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Toggle Button */}
                    {categories.length > 7 && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            {expanded ? (
                                <>
                                    <ChevronUp className="w-4 h-4" /> Show Less
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-4 h-4" /> Show All
                                </>
                            )}
                        </button>
                    )}

                </div>

                <div>
                    <h4 className="text-base font-semibold mb-3 pb-2">Availability</h4>
                    <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm text-gray-700">
                            <input type="checkbox" className="accent-black" checked={inStockOnly} onChange={handleInStockToggle} />
                            <span>In stock only</span>
                        </label>
                    </div>
                </div>

                <div>
                    <h4 className="text-base font-semibold mb-3 pb-2">Price Range</h4>
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            type="number"
                            min={0}
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            className="w-1/2 text-sm border border-gray-300 rounded px-2 py-1"
                        />
                        <input
                            type="number"
                            min={0}
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            className="w-1/2 text-sm border border-gray-300 rounded px-2 py-1"
                        />
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={500}
                        value={maxPrice}
                        onChange={(e) => handleMaxPriceChange(e)}
                        className="w-full accent-black"
                    />
                    <div className="text-sm text-gray-700 mt-1">
                        {minPrice} {process.env.NEXT_PUBLIC_CURRENCY || "$"} - {maxPrice} {process.env.NEXT_PUBLIC_CURRENCY || "$"}
                    </div>
                </div>



                <div className="flex gap-2">
                    <button
                        onClick={() => fetchFilteredProducts()}
                        className="flex-1 bg-black text-white text-sm py-2 rounded"
                    >
                        Apply
                    </button>
                    <button
                        onClick={resetFilters}
                        className="flex-1 border border-gray-300 text-sm py-2 rounded"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </aside>
    );
}
