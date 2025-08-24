// redux/slices/cartSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";

/**
 * SECURITY NOTES
 *  - Never trust price/discount coming from the client when you submit the cart to a server.
 *    Always re-fetch/validate product price, stock, and discounts server-side before order creation.
 *  - localStorage can be edited by users. Treat it as a UX cache, not a source of truth.
 *  - Do not store PII/payment details here. Keep cart data minimal.
 */

/** ------ Persistence helpers (resilient & defensive) ------ */
const CART_STORAGE_KEY = "app.cart.v1";

function loadCartFromStorage() {
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(CART_STORAGE_KEY) : null;
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Basic shape validation
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.items)) return null;
    return parsed;
  } catch {
    return null; // corrupt or tampered data -> ignore
  }
}

function saveCartToStorage(state) {
  try {
    // Only store non-sensitive minimal cart info
    const snapshot = {
      items: state.items,
      updatedAt: Date.now(),
    };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(snapshot));
    }
  } catch {
    // Storage might be full or inaccessible (private mode); fail silently
  }
}

/** ------ Initial state ------ */
const initialState = {
  items: [],         // [{id, slug, name, price, image, qty}]
  isLoading: false,
  lastError: null,   // string | null
  updatedAt: null,
};

/** ------ Core slice ------ */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart(state, action) {
      const data = action.payload;
      if (data && Array.isArray(data.items)) {
        state.items = data.items;
        state.updatedAt = Date.now();
        state.lastError = null;
        saveCartToStorage(state);
      }
    },

    setLoading(state, action) {
      state.isLoading = Boolean(action.payload);
    },

    clearError(state) {
      state.lastError = null;
    },

    /** Add new item (assumes uniqueness already enforced by thunk) */
    addItem(state, action) {
      const item = action.payload; // {id, slug, name, price, image, qty}
      state.lastError = null;
      state.items.push({
        id: item.id,
        slug: item.slug ?? null,
        name: item.name,
        price: Number(item.price), // store numeric; server must validate later
        unite_price: Number(item.price), // store numeric; server must validate later
        image: item.image ?? null,
        qty: Math.max(1, Number(item.qty) || 1),
      });
      state.updatedAt = Date.now();
      saveCartToStorage(state);
    },

    /** Update quantity for an existing item */
    updateQty(state, action) {
      const { id, qty } = action.payload;
      const target = state.items.find((i) => i.id === id);
      if (!target) {
        state.lastError = "Item not found in cart.";
        return;
      }
      const nextQty = Math.max(1, Number(qty) || 1);
      target.qty = nextQty;
      state.lastError = null;
      state.updatedAt = Date.now();
      saveCartToStorage(state);
    },

    /** Remove item by id */
    removeItem(state, action) {
      const id = action.payload;
      const next = state.items.filter((i) => i.id !== id);
      state.items = next;
      state.lastError = null;
      state.updatedAt = Date.now();
      saveCartToStorage(state);
    },

    /** Empty cart */
    clearCart(state) {
      state.items = [];
      state.lastError = null;
      state.updatedAt = Date.now();
      saveCartToStorage(state);
    },

    /** Set explicit error message (UI can read & display) */
    setCartError(state, action) {
      state.lastError = action.payload || "Unknown cart error.";
    },
  },
});

export const {
  hydrateCart,
  setLoading,
  clearError,
  addItem,
  updateQty,
  removeItem,
  clearCart,
  setCartError,
} = cartSlice.actions;

/** ------ Thunks (business rules) ------ */

/**
 * addItemSafe enforces "unique constraint":
 * - If item already in cart, it does NOT add. Instead sets an error.
 * - Else, adds the item.
 */
export const addItemSafe = (item) => (dispatch, getState) => {
  const state = getState();
  const exists = state.cart.items.some((i) => i.id === item.id);
  if (exists) {
    dispatch(setCartError("Item is already in cart."));
    return { ok: false, error: "Item is already in cart." };
  }
  dispatch(addItem(item));
  return { ok: true };
};

/**
 * Boot-time hydration from localStorage.
 * Call once in your app layout (client side).
 */
export const hydrateCartFromStorage = () => (dispatch) => {
  const data = loadCartFromStorage();
  if (data) dispatch(hydrateCart(data));
};

/** ------ Selectors (memoized where useful) ------ */
const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector([selectCartState], (c) => c.items);
export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.qty, 0)
);
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.qty * i.price, 0)
);
export const selectCartError = (state) => state.cart.lastError;
export const selectIsCartLoading = (state) => state.cart.isLoading;

export default cartSlice.reducer;
