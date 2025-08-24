// redux/slices/wishlistSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

/**
 * SECURITY & UX NOTES
 *  - Wishlist is for UX only. Never trust client wishlist data as truth.
 *  - Treat localStorage as a cache, not a database. Users may clear or tamper with it.
 *  - Store only minimal product metadata. No sensitive info here.
 */

/** ------ Persistence helpers (resilient & defensive) ------ */
const WISHLIST_STORAGE_KEY = "app.wishlist.v1";

function loadWishlistFromStorage() {
  try {
    const raw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(WISHLIST_STORAGE_KEY)
        : null;
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    // Shape validation
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.items))
      return null;

    return parsed;
  } catch {
    return null; // corrupted/tampered -> ignore
  }
}

function saveWishlistToStorage(state) {
  try {
    const snapshot = {
      items: state.items,
      updatedAt: Date.now(),
    };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(snapshot));
    }
  } catch {
    // Fail silently: storage may be blocked (incognito/private mode)
  }
}

/** ------ Initial state ------ */
const initialState = {
  items: [],        // [{id, slug, name, price, image}]
  isLoading: false,
  lastError: null,  // error string | null
  updatedAt: null,
};

/** ------ Core slice ------ */
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    /** Hydrate from storage or server */
    hydrateWishlist(state, action) {
      const data = action.payload;
      if (data && Array.isArray(data.items)) {
        state.items = data.items;
        state.updatedAt = Date.now();
        state.lastError = null;
        saveWishlistToStorage(state);
      }
    },

    setLoading(state, action) {
      state.isLoading = Boolean(action.payload);
    },

    clearError(state) {
      state.lastError = null;
    },

    /** Add product to wishlist (no duplicates) */
    addItem(state, action) {
      const item = action.payload; // {id, slug, name, price, image}
      const exists = state.items.some((i) => i.id === item.id);
      if (exists) {
        state.lastError = "Item already in wishlist.";
        return;
      }
      state.items.push({
        id: item.id,
        slug: item.slug ?? null,
        name: item.name,
        price: Number(item.price) || 0,
        stockStatus:item.stockStatus,
        image: item.image ?? null,
      });
      state.lastError = null;
      state.updatedAt = Date.now();
      saveWishlistToStorage(state);
    },

    /** Remove item by id */
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      state.lastError = null;
      state.updatedAt = Date.now();
      saveWishlistToStorage(state);
    },

    /** Clear entire wishlist */
    clearWishlist(state) {
      state.items = [];
      state.lastError = null;
      state.updatedAt = Date.now();
      saveWishlistToStorage(state);
    },

    /** Explicit error setter */
    setWishlistError(state, action) {
      state.lastError = action.payload || "Unknown wishlist error.";
    },
  },
});

/** ------ Actions ------ */
export const {
  hydrateWishlist,
  setLoading,
  clearError,
  addItem,
  removeItem,
  clearWishlist,
  setWishlistError,
} = wishlistSlice.actions;

/** ------ Thunks ------ */

/**
 * Boot-time hydration from localStorage.
 * Call once in your app layout (client side).
 */
export const hydrateWishlistFromStorage = () => (dispatch) => {
  const data = loadWishlistFromStorage();
  if (data) dispatch(hydrateWishlist(data));
};

/** Safe add (with feedback) */
export const addItemSafe = (item) => (dispatch, getState) => {
  const state = getState();
  const exists = state.wishlist.items.some((i) => i.id === item.id);
  if (exists) {
    dispatch(setWishlistError("Item already in wishlist."));
    return { ok: false, error: "Item already in wishlist." };
  }
  dispatch(addItem(item));
  return { ok: true };
};

/** ------ Selectors (memoized for performance) ------ */
const selectWishlistState = (state) => state.wishlist;

export const selectWishlistItems = createSelector(
  [selectWishlistState],
  (w) => w.items
);

export const selectWishlistCount = createSelector(
  [selectWishlistItems],
  (items) => items.length
);

export const selectWishlistError = (state) => state.wishlist.lastError;
export const selectIsWishlistLoading = (state) => state.wishlist.isLoading;

export default wishlistSlice.reducer;
