import {createSlice, SerializedError} from "@reduxjs/toolkit";
import {IBrandResp} from "../types/brandTypes.ts";

type brandType = {
  error: SerializedError | null,
  loading: boolean,
  brands: IBrandResp[],
};

const initialState: brandType = {
  error: null,
  loading: false,
  brands: [],
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  },
})
