// features/viewSlice.js
import { createSlice } from "@reduxjs/toolkit";

/**
 * Recently Viewed Slice (backend-aware)
 *
 * - Pure reducer (no localStorage access)
 * - Normalizes backend product payloads (Django/DRF MiniProductSerializer)
 * - Minimal persisted shape: { id, slug, name, image, price, comparePrice, stock, onSale, viewedAt }
 * - Newest-first, unique, limited to MAX_ITEMS
 */

const MAX_ITEMS = 4;

/**
 * Safely parse/convert a price value (string/number/Decimal) into a number or null.
 * Defensive: returns null for invalid values.
 */
const parsePrice = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return Number(value);
  if (typeof value === "string") {
    // Remove currency symbols and commas (e.g. "$1,234.56") then parse
    const cleaned = value.replace(/[^\d.-]/g, "");
    const num = Number(cleaned);
    return Number.isFinite(num) ? num : null;
  }
  // handle objects like { amount: "12.34" } or Decimal from some APIs
  if (typeof value === "object" && value !== null) {
    if (value.amount) return parsePrice(value.amount);
    if (value.toString) return parsePrice(String(value));
  }
  return null;
};

/**
 * Extract best candidate image from product payload.
 * Accepts:
 * - product.productImages = [{ id, image: "/media/..." }, ...]
 * - product.productImages = ["/media/...", ...]
 * - product.image = "/media/..."
 * Returns an empty string if nothing found.
 */
const pickImage = (product) => {
  // ManyToMany nested serializer: array of objects { id, image }
  const imgs = product.productImages ?? product.images ?? product.product_images ?? null;

  if (Array.isArray(imgs) && imgs.length) {
    const first = imgs[0];
    // nested object with `image` field (your ProductImageSerializer returns { id, image })
    if (first && typeof first === "object") {
      return first.image ?? first.url ?? first.toString?.() ?? "";
    }
    // direct string array
    if (typeof first === "string") return first;
  }

  // fallback single fields
  if (typeof product.image === "string") return product.image;
  if (typeof product.productImage === "string") return product.productImage;
  return "";
};

/**
 * Normalize incoming product (raw API object OR already normalized)
 * Returns null if not valid.
 *
 * Expected raw fields from your MiniProductSerializer:
 *  - id (UUID)
 *  - productSlug
 *  - productName
 *  - productImages (array of {id, image})
 *  - productPrice (Decimal)
 *  - productComparePrice (Decimal)
 *  - productStock (int)
 *
 * Normalized shape (minimal):
 * {
 *   id,
 *   slug,
 *   name,
 *   image,
 *   price,         // number | null
 *   comparePrice,  // number | null
 *   stock,         // number | null
 *   onSale,        // boolean
 *   viewedAt       // timestamp ms
 * }
 */
const normalizeProduct = (product) => {
  if (!product) return null;

  // Accept already-normalized objects (id + viewedAt) without re-normalizing
  if (product.id && product.viewedAt && (product.name || product.slug)) {
    // still ensure types are correct
    return {
      id: String(product.id),
      slug: product.slug ?? null,
      name: String(product.name ?? ""),
      image: String(product.image ?? ""),
      price: parsePrice(product.price ?? product.productPrice),
      comparePrice: parsePrice(product.comparePrice ?? product.productComparePrice),
      stock:
        product.stock !== undefined && product.stock !== null
          ? Number(product.stock)
          : product.productStock !== undefined
          ? Number(product.productStock)
          : null,
      onSale:
        product.onSale ?? // explicit flag if already set
        Boolean(product.productIsOnSale) ?? // backend boolean flag
        (parsePrice(product.productComparePrice) > parsePrice(product.productPrice)) ??
        false,
      viewedAt: Number(product.viewedAt) || Date.now(),
    };
  }

  // Extract id (UUID) - try common names
  const id = product.id ?? product.pk ?? product._id;
  if (!id) return null;

  const name = product.productName ?? product.name ?? product.title ?? "";
  const slug = product.productSlug ?? product.slug ?? null;
  const image = pickImage(product);
  const price = parsePrice(product.productPrice ?? product.price);
  const comparePrice = parsePrice(product.productComparePrice ?? product.comparePrice);
  const stock =
    product.productStock !== undefined && product.productStock !== null
      ? Number(product.productStock)
      : null;

  // Determine onSale: explicit flag from backend or comparePrice > price
  let onSale = false;
  if (typeof product.productIsOnSale === "boolean") {
    onSale = product.productIsOnSale;
  } else if (comparePrice !== null && price !== null) {
    // If comparePrice exists and is greater than price -> on sale
    onSale = comparePrice > price;
  }

  return {
    id: String(id),
    slug,
    name: String(name),
    image: String(image || ""),
    price,
    comparePrice,
    stock: Number.isFinite(stock) ? stock : null,
    onSale,
    viewedAt: Date.now(),
  };
};

/**
 * Merge helper to keep uniqueness (latest viewedAt wins).
 * Accepts array of normalized items and returns deduped newest-first array.
 */
const dedupeAndSort = (items) => {
  const map = new Map();
  for (const item of items) {
    if (!item || !item.id) continue;
    const existing = map.get(item.id);
    // keep the item with the latest viewedAt
    if (!existing || (item.viewedAt || 0) > (existing.viewedAt || 0)) {
      map.set(item.id, item);
    }
  }
  // convert back to array and sort by viewedAt desc
  const arr = Array.from(map.values());
  arr.sort((a, b) => (b.viewedAt || 0) - (a.viewedAt || 0));
  return arr;
};

const initialState = {
  recentlyViewed: [], // persisted by redux-persist
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    /**
     * Add product to recently viewed.
     * Accepts raw API product or normalized product.
     */
    addRecentlyViewed: (state, action) => {
      const normalized = normalizeProduct(action.payload);
      if (!normalized) return;

      // remove existing with same id (if any)
      state.recentlyViewed = state.recentlyViewed.filter(
        (p) => p.id !== normalized.id
      );

      // put at top (newest-first)
      state.recentlyViewed.unshift(normalized);

      // enforce max length
      if (state.recentlyViewed.length > MAX_ITEMS) {
        state.recentlyViewed = state.recentlyViewed.slice(0, MAX_ITEMS);
      }
    },

    /**
     * Remove product by id
     * payload: product id
     */
    removeRecentlyViewed: (state, action) => {
      const id = action.payload;
      if (!id) return;
      state.recentlyViewed = state.recentlyViewed.filter((p) => p.id !== id);
    },

    /**
     * Clear list
     */
    clearRecentlyViewed: (state) => {
      state.recentlyViewed = [];
    },

    /**
     * Replace recentlyViewed.
     * Accepts:
     *  - array of normalized items OR
     *  - array of raw API products (we normalize each)
     *
     * The result is deduped, newest-first, limited to MAX_ITEMS.
     */
    setRecentlyViewed: (state, action) => {
      const payload = Array.isArray(action.payload) ? action.payload : [];
      const normalizedList = payload
        .map((item) => normalizeProduct(item))
        .filter(Boolean);

      const deduped = dedupeAndSort(normalizedList).slice(0, MAX_ITEMS);
      state.recentlyViewed = deduped;
    },
  },
});

// Selectors
export const selectRecentlyViewed = (state) => state.view?.recentlyViewed ?? [];
export const selectRecentlyViewedCount = (state) =>
  (state.view?.recentlyViewed ?? []).length;
export const selectRecentlyViewedById = (state, id) =>
  (state.view?.recentlyViewed ?? []).find((p) => p.id === id);

// Actions
export const {
  addRecentlyViewed,
  removeRecentlyViewed,
  clearRecentlyViewed,
  setRecentlyViewed,
} = viewSlice.actions;

export default viewSlice.reducer;
