import {configureStore} from "@reduxjs/toolkit";
import authUserSlice from "./authUserSlice.ts";
import categoriesSlice from "./categoriesSlice.ts";
import modalSlice from "./modalSlice.ts";
import brandsSlice from "./brandsSlice.ts";
import firmsSlice from "./firmsSlice.ts";
import productsSlice from "./productsSlice.ts";
import salesSlice from "./salesSlice.ts";
import purchasesSlice from "./purchasesSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authUserSlice,
    modal: modalSlice,
    categories: categoriesSlice,
    brands: brandsSlice,
    firms: firmsSlice,
    products: productsSlice,
    sales: salesSlice,
    purchases: purchasesSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
