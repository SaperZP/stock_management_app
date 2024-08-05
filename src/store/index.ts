import {configureStore} from "@reduxjs/toolkit";
import authUserSlice from "./authUserSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authUserSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
