import {configureStore} from "@reduxjs/toolkit";
import authUserSlice from "./authUserSlice.ts";
import categoriesSlice from "./categoriesSlice.ts";
import modalSlice from "./modalSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authUserSlice,
    categories: categoriesSlice,
    modal: modalSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
