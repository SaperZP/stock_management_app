import {createAsyncThunk, createSlice, SerializedError} from "@reduxjs/toolkit";
import {ICategoryResp} from "../types/categoriesServerTypes.ts";
import {addCategory, deleteCategory, editCategory, getCategories} from "../api/api.ts";
import {toast} from "react-toastify";

type CategoriesStateType = {
  error: SerializedError | null,
  loading: boolean,
  categories: ICategoryResp[],
};

const initialState: CategoriesStateType = {
  error: null,
  loading: false,
  categories: [],
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


    builder.addCase(addCategoryAction.fulfilled, (state, {payload}) => {
      state.categories.push(payload);
      state.loading = false;
    });

    builder.addCase(addCategoryAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });


    builder.addCase(editCategoryAction.fulfilled, (state, {payload}) => {
      state.categories = state.categories.map(category =>
          category.id === payload.id ? payload : category);
      state.loading = false;
    });

    builder.addCase(editCategoryAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });


    builder.addCase(deleteCategoryAction.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.categories = state.categories.filter(category => category.id !== payload)
      toast.done('category was successfully deleted');
    });

    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });
  },
});

const getCategoriesAction = createAsyncThunk("categories/getCategories", getCategories);
const addCategoryAction = createAsyncThunk("categories/addCategories", addCategory);
const editCategoryAction = createAsyncThunk("categories/editCategory", editCategory);
const deleteCategoryAction = createAsyncThunk("categories/deleteCategory", deleteCategory);

export default categoriesSlice.reducer;
export {getCategoriesAction, addCategoryAction, editCategoryAction, deleteCategoryAction};


