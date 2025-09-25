"use client";
import { useRef, useState, useCallback } from "react";

/**
 * ProductFilters
 * - Only fetches when user clicks "Apply" (or Reset -> Apply)
 * - Prevents duplicate calls (by comparing a serialized param key)
 * - Cancels previous request using AbortController to avoid races
 */

export default function ProductFilters({ pData, setPData, seLoading }) {
  // Filter state (local only, not auto-fetching)
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [searchKeyword, setSearchKeyword] = useState("");

  // refs for request control / dedupe
  const controllerRef = useRef(null);
  const lastParamsRef = useRef(null);
  const inFlightRef = useRef(false);

  // helper: build a stable key for current filter values
  const buildParamsKey = () => {
    const cats = Array.from(selectedCategories).sort();
    return JSON.stringify({
      cats,
      inStockOnly,
      minPrice,
      maxPrice,
      searchKeyword: (searchKeyword || "").trim(),
    });
  };

  // Build URL from current filters
  const buildUrl = () => {
    const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/search/`);

    // repeated category params
    if (selectedCategories.size > 0) {
      Array.from(selectedCategories).forEach((catId) =>
        url.searchParams.append("category", catId)
      );
    }

    if (inStockOnly) url.searchParams.append("in_stock", "true");
    if (minPrice !== null && minPrice !== "") url.searchParams.append("min_price", String(minPrice));
    if (maxPrice !== null && maxPrice !== "") url.searchParams.append("max_price", String(maxPrice));
    if (searchKeyword && searchKeyword.trim() !== "") url.searchParams.append("name", searchKeyword.trim());

    return url.toString();
  };

  // Fetch function, call on Apply (or Reset), supports forcing even if key same
  const fetchFilteredProducts = useCallback(
    async ({ force = false } = {}) => {
      const paramsKey = buildParamsKey();

      // dedupe: same params and not forced -> skip
      if (!force && lastParamsRef.current === paramsKey) {
        return;
      }

      // abort previous request if still running
      if (controllerRef.current) {
        try {
          controllerRef.current.abort();
        } catch (e) {
          /* ignore */
        }
        controllerRef.current = null;
      }

      // create new controller for this request
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        inFlightRef.current = true;
        seLoading(true);

        const url = buildUrl();

        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          signal: controller.signal,
        });

        // if aborted, exit silently
        if (controller.signal.aborted) return;

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.error("Failed to fetch products", res.status, text);
          return;
        }

        const data = await res.json();

        // Merge with existing pData (only replacing products)
        setPData((prev) => ({
          ...prev,
          products: (data.results && data.results.products) || data.results || data || [],
        }));

        // update lastParams key (dedupe)
        lastParamsRef.current = paramsKey;
      } catch (err) {
        // Abort error is normal when we cancel previous requests
        if (err.name === "AbortError") {
          // ignored
        } else {
          console.error("Error fetching filtered products:", err);
        }
      } finally {
        inFlightRef.current = false;
        seLoading(false);
        controllerRef.current = null;
      }
    },
    // deps: only local state (we purposely capture current state when called)
    // fetchFilteredProducts called manually (onApply / onReset)
    [selectedCategories, inStockOnly, minPrice, maxPrice, searchKeyword, setPData, seLoading]
  );

  // UI handlers
  const toggleCategory = (catId) => {
    setSelectedCategories((prev) => {
      const s = new Set(prev);
      if (s.has(catId)) s.delete(catId);
      else s.add(catId);
      return s;
    });
  };

  const handleApply = async () => {
    // explicit apply -> force call
    await fetchFilteredProducts({ force: true });
  };

  const resetFilters = async () => {
    setSelectedCategories(new Set());
    setInStockOnly(false);
    setMinPrice(0);
    setMaxPrice(500);
    setSearchKeyword("");
    // explicit reset should fetch fresh (force)
    await fetchFilteredProducts({ force: true });
  };

  return (
    <aside className="w-full md:w-[250px] flex-shrink-0 hidden md:block">
      <div className="space-y-6 p-4 bg-gray-50 rounded-lg ">
        {/* Search */}
        <div>
          <h4 className="text-base font-semibold mb-3 pb-2">Search</h4>
          <input
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search product name..."
            className="w-full text-sm border border-gray-300 rounded px-2 py-1"
          />
        </div>

        {/* Availability */}
        <div>
          <h4 className="text-base font-semibold mb-3 pb-2">Availability</h4>
          <label className="flex items-center space-x-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="accent-black"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            <span>In stock only</span>
          </label>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="text-base font-semibold mb-3 pb-2">Price Range</h4>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="number"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value || 0))}
              className="w-1/2 text-sm border border-gray-300 rounded px-2 py-1"
            />
            <input
              type="number"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value || 500))}
              className="w-1/2 text-sm border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <input
            type="range"
            min={0}
            max={500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value || 500))}
            className="w-full accent-black"
          />
          <div className="text-sm text-gray-700 mt-1">
            {minPrice} {process.env.NEXT_PUBLIC_CURRENCY || "$"} - {maxPrice}{" "}
            {process.env.NEXT_PUBLIC_CURRENCY || "$"}
          </div>
        </div>

        {/* Apply / Reset */}
        <div className="flex gap-2">
          <button
            onClick={handleApply}
            disabled={inFlightRef.current}
            className={`flex-1 text-sm py-2 rounded ${
              inFlightRef.current ? "bg-gray-400 text-white" : "bg-black text-white"
            }`}
          >
            {inFlightRef.current ? "Applying..." : "Apply"}
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
