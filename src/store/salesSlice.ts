import {createAsyncThunk, createSlice, SerializedError} from "@reduxjs/toolkit";
import {addSale, deleteSale, editSale, getSales} from "../api/api.ts";
import {toast} from "react-toastify";
import {ISalesResp} from "../types/salesTypes.ts";

type SalesStateType = {
  loading: boolean;
  error: SerializedError | null;
  sales: ISalesResp[];
};

const initialState: SalesStateType = {
  error: null,
  loading: false,
  sales: [],
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSalesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSalesAction.fulfilled, (state, {payload}) => {
      state.sales = payload;
      state.loading = false;
    });
    builder.addCase(getSalesAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(addSaleAction.fulfilled, (state, {payload}) => {
      state.sales.push(payload);
      state.loading = false;
    });
    builder.addCase(addSaleAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(editSaleAction.fulfilled, (state, {payload}) => {
      state.sales = state.sales.map(sale =>
          sale.id === payload.id ? payload : sale);
      state.loading = false;
    });
    builder.addCase(editSaleAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(deleteSaleAction.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.sales = state.sales.filter(sale => sale.id !== payload)
      toast.done('Sale was successfully deleted');
    });
    builder.addCase(deleteSaleAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });
  },
});

const getSalesAction = createAsyncThunk("sales/getSales", getSales);
const addSaleAction = createAsyncThunk("sales/addSale", addSale);
const editSaleAction = createAsyncThunk("sales/editSale", editSale);
const deleteSaleAction = createAsyncThunk("sales/deleteSale", deleteSale);

export default salesSlice.reducer;
export {getSalesAction, addSaleAction, editSaleAction, deleteSaleAction};
