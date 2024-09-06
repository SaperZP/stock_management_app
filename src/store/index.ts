import {configureStore} from "@reduxjs/toolkit";
import authUserSlice from "./authUserSlice.ts";
import categoriesSlice from "./categoriesSlice.ts";
import modalSlice from "./modalSlice.ts";
import brandsSlice from "./brandsSlice.ts";
import firmsSlice from "./firmsSlice.ts";
import productsSlice from "./productsSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authUserSlice,
    modal: modalSlice,
    categories: categoriesSlice,
    brands: brandsSlice,
    firms: firmsSlice,
    products: productsSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
