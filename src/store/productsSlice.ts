import {IProductsResp} from "../types/productsTypes.ts";
import {createAsyncThunk, createSlice, SerializedError} from "@reduxjs/toolkit";
import {addProduct, deleteProduct, editProduct, getProducts} from "../api/api.ts";
import {toast} from "react-toastify";

type ProductsStateType = {
  loading: boolean;
  error: SerializedError | null;
  products: IProductsResp[];
};

const initialState: ProductsStateType = {
  error: null,
  loading: false,
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductsAction.fulfilled, (state, {payload}) => {
      state.products = payload;
      state.loading = false;
    });
    builder.addCase(getProductsAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(addProductAction.fulfilled, (state, {payload}) => {
      state.products.push(payload);
      state.loading = false;
    });
    builder.addCase(addProductAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(editProductAction.fulfilled, (state, {payload}) => {
      state.products = state.products.map(product =>
          product.id === payload.id ? payload : product);
      state.loading = false;
    });
    builder.addCase(editProductAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(deleteProductAction.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.products = state.products.filter(product => product.id !== payload)
      toast.done('product was successfully deleted');
    });
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });
  },
});

const getProductsAction = createAsyncThunk("products/getProducts", getProducts);
const addProductAction = createAsyncThunk("products/addProduct", addProduct);
const editProductAction = createAsyncThunk("products/editProduct", editProduct);
const deleteProductAction = createAsyncThunk("products/deleteProduct", deleteProduct);

export default productsSlice.reducer;
export {getProductsAction, addProductAction, editProductAction, deleteProductAction};
