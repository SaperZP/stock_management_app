import {configureStore} from "@reduxjs/toolkit";
import authUserSlice from "./authUserSlice.ts";
import categoriesSlice from "./categoriesSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authUserSlice,
    categories: categoriesSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
