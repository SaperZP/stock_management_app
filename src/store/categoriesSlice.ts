import {createAsyncThunk, createSlice, SerializedError} from "@reduxjs/toolkit";
import {ICategory} from "../types/categoriesServerTypes.ts";
import {getCategories} from "../api/api.ts";
import {toast} from "react-toastify";

type categoryType = {
  error: SerializedError | null,
  loading: boolean,
  categories: null | ICategory[],
};

const initialState: categoryType = {
  error: null,
  loading: false,
  categories: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCategoriesAction.fulfilled, (state, {payload}) => {
      state.categories = payload;
      state.loading = false;
    });

    builder.addCase(getCategoriesAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });
  },
});

const getCategoriesAction = createAsyncThunk(
    "categories/getCategories",
    (token: string) => getCategories(token),
);

export default categoriesSlice.reducer;
export {getCategoriesAction};


