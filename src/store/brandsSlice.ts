import {createAsyncThunk, createSlice, SerializedError} from "@reduxjs/toolkit";
import {IBrandResp} from "../types/brandTypes.ts";
import {addBrand, deleteBrand, editBrand, getBrands} from "../api/api.ts";
import {toast} from "react-toastify";

type BrandsStateType = {
  error: SerializedError | null,
  loading: boolean,
  brands: IBrandResp[],
};

const initialState: BrandsStateType = {
  error: null,
  loading: false,
  brands: [],
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrandsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBrandsAction.fulfilled, (state, {payload}) => {
      state.brands = payload;
      state.loading = false;
    });
    builder.addCase(getBrandsAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(addBrandAction.fulfilled, (state, {payload}) => {
      state.brands.push(payload);
      state.loading = false;
    });
    builder.addCase(addBrandAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(editBrandAction.fulfilled, (state, {payload}) => {
      state.brands = state.brands.map(brand =>
          brand.id === payload.id ? payload : brand);
      state.loading = false;
    });
    builder.addCase(editBrandAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(deleteBrandAction.fulfilled, (state, {payload}) => {
      state.brands = state.brands.filter(brand => brand.id !== payload);
      state.loading = false;
    });
    builder.addCase(deleteBrandAction.rejected, (state, action) => {
      toast.done('brand was successfully deleted');
      state.error = action.error;
      state.loading = false;
    });
  },
});

const getBrandsAction = createAsyncThunk("brands/getBrands", getBrands);
const addBrandAction = createAsyncThunk("brands/addBrand", addBrand);
const editBrandAction = createAsyncThunk("brands/editBrand", editBrand);
const deleteBrandAction = createAsyncThunk("brands/deleteBrand", deleteBrand);

export default brandsSlice.reducer;
export {getBrandsAction, addBrandAction, editBrandAction, deleteBrandAction};
