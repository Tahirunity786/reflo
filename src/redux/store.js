import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import expireTransform from "@/redux/utils/expireTransform";

// Import your slices
import userReducer from "@/redux/slices/userSlice";
import cartReducer from "@/redux/slices/cartSlice";
import wishReducer from "@/redux/slices/wishSlice";
import viewReducer from "@/redux/slices/viewSlice"; // ✅ New slice

// Configure persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart", "wishlist", "view"], // ✅ Persist recently viewed
  transforms: [expireTransform],
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wishlist: wishReducer, // <-- wishlist slice
  view: viewReducer,     // ✅ recently viewed slice
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Persistor
export const persistor = persistStore(store);
