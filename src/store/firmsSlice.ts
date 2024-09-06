import {createAsyncThunk, createSlice, SerializedError} from "@reduxjs/toolkit";
import {IFirmsResp} from "../types/firmsTypes.ts";
import {addFirm, deleteFirm, editFirm, getFirms} from "../api/api.ts";
import {toast} from "react-toastify";

type FilmsStateType = {
  error: SerializedError | null,
  loading: boolean,
  firms: IFirmsResp[]
};

const initialState: FilmsStateType = {
  error: null,
  loading: false,
  firms: [],
}

const firmsSlice = createSlice({
  name: "firms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFirmsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFirmsAction.fulfilled, (state, {payload}) => {
      state.firms = payload;
      state.loading = false;
    });
    builder.addCase(getFirmsAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(addFirmAction.fulfilled, (state, {payload}) => {
      state.firms.push(payload);
      state.loading = false;
    });
    builder.addCase(addFirmAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(editFirmAction.fulfilled, (state, {payload}) => {
      state.firms = state.firms.map(firm =>
          firm.id === payload.id ? payload : firm);
      state.loading = false;
    });
    builder.addCase(editFirmAction.rejected, (state, action) => {
      toast.error(action.error.message);
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(deleteFirmAction.fulfilled, (state, {payload}) => {
      state.firms = state.firms.filter(firm => firm.id !== payload);
      state.loading = false;
    });
    builder.addCase(deleteFirmAction.rejected, (state, action) => {
      toast.done('firm was successfully deleted');
      state.error = action.error;
      state.loading = false;
    });
  },
});

const getFirmsAction = createAsyncThunk("firms/getFirms", getFirms);
const addFirmAction = createAsyncThunk("firms/addFirm", addFirm);
const editFirmAction = createAsyncThunk("firms/ediFirm", editFirm);
const deleteFirmAction = createAsyncThunk("firms/deleteFirm", deleteFirm);

export default firmsSlice.reducer;
export {getFirmsAction, addFirmAction, editFirmAction, deleteFirmAction};
