import { createSlice } from "@reduxjs/toolkit";
import { getShopThunk, getShopDetailThunk } from "./thunk";
import { ShopDetail } from "@/src/types/shop";

type stateType = {
  shop: any;
  shopDetail: ShopDetail | null;
  loading: boolean;
};

const initialState: stateType = {
  shop: [],
  shopDetail: null,
  loading: false,
};

export const manageShopSlice = createSlice({
  name: "manageShop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShopThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getShopThunk.fulfilled, (state, { payload }) => {
      state.shop = payload;
      state.loading = false;
    });
    builder.addCase(getShopDetailThunk.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getShopDetailThunk.fulfilled, (state, { payload }) => {
      state.shopDetail = payload;
      state.loading = false;
    });
  },
});

export const { reducer: manageShopReducer, actions: manageShopActions } =
  manageShopSlice;
