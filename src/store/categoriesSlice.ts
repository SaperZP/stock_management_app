import {createAsyncThunk, createSlice, SerializedError} from "@reduxjs/toolkit";
import {IAddCategoryRequest, ICategory} from "../types/categoriesServerTypes.ts";
import {addCategory, deleteCategory, editCategory, getCategories} from "../api/api.ts";
import {toast} from "react-toastify";

type categoryType = {
  error: SerializedError | null,
  loading: boolean,
  categories: ICategory[],
};

const initialState: categoryType = {
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

const getCategoriesAction = createAsyncThunk(
    "categories/getCategories",
    (token: string) => getCategories(token),
);

const addCategoryAction = createAsyncThunk(
    "categories/addCategories",
    (data: { token: string, input: IAddCategoryRequest }) =>
        addCategory(data.token, data.input),
);

const editCategoryAction = createAsyncThunk(
    "categories/editCategory",
    (data: { token: string, input: IAddCategoryRequest, id: number }) => editCategory(data.token, data.input, data.id),
);

const deleteCategoryAction = createAsyncThunk(
    "categories/deleteCategory",
    (data: { token: string, id: number }) => deleteCategory(data.token, data.id),
);

export default categoriesSlice.reducer;
export {getCategoriesAction, addCategoryAction, editCategoryAction, deleteCategoryAction};


