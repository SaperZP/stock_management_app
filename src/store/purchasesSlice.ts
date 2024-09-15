import {createAsyncThunk, createSlice, SerializedError} from "@reduxjs/toolkit";
import {addPurchase, deletePurchase, editPurchase, getPurchases} from "../api/api.ts";
import {toast} from "react-toastify";
import {IPurchaseResp} from "../types/purchasesTypes.ts";

type PurchasesStateType = {
  loading: boolean;
  error: SerializedError | null;
  purchases: IPurchaseResp[];
};

const initialState: PurchasesStateType = {
  error: null,
  loading: false,
  purchases: [],
};

const purchasesSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPurchasesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPurchasesAction.fulfilled, (state, {payload}) => {
      state.purchases = payload;
      state.loading = false;
    });
    builder.addCase(getPurchasesAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(addPurchaseAction.fulfilled, (state, {payload}) => {
      state.purchases.push(payload);
      state.loading = false;
    });
    builder.addCase(addPurchaseAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(editPurchaseAction.fulfilled, (state, {payload}) => {
      state.purchases = state.purchases.map(purchase =>
          purchase.id === payload.id ? payload : purchase);
      state.loading = false;
    });
    builder.addCase(editPurchaseAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(deletePurchaseAction.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.purchases = state.purchases.filter(purchase => purchase.id !== payload)
      toast.done('Purchase was successfully deleted');
    });
    builder.addCase(deletePurchaseAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });
  },
});

const getPurchasesAction = createAsyncThunk("purchases/getPurchases", getPurchases);
const addPurchaseAction = createAsyncThunk("purchases/addPurchase", addPurchase);
const editPurchaseAction = createAsyncThunk("purchases/editPurchase", editPurchase);
const deletePurchaseAction = createAsyncThunk("purchases/deletePurchase", deletePurchase);

export default purchasesSlice.reducer;
export {getPurchasesAction, addPurchaseAction, editPurchaseAction, deletePurchaseAction};
