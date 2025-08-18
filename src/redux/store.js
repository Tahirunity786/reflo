import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import expireTransform from "@/redux/utils/expireTransform";
import userReducer from "@/redux/slices/userSlice";
import cartReducer from "@/redux/slices/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","cart"], 
  transforms: [expireTransform],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
