import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import addressReducer from "./features/address/addressSlice";

// Configuration for persisting both auth and wishlist slices
const authPersistConfig = {
  key: "auth",
  storage,
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
};

const addressPersistConfig = {
  key: "address",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);

const persistedAddressReducer = persistReducer(
  addressPersistConfig,
  addressReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer, // Persisted auth reducer
    wishlist: persistedWishlistReducer, // Persisted wishlist reducer
    address: persistedAddressReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
