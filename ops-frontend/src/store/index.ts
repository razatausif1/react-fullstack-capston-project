import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./authSlice";
import { backendApi } from "./backendApi";
import { productApi } from "./productApi";
import productPaginationReducer from "./productPaginationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productPagination: productPaginationReducer,
    [backendApi.reducerPath]: backendApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware, productApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
